'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import PostManageForm from '~/components/shared/PostManageForm'
import { newPost } from '~/actions/new-post'
import { CLOUDINARY_POSTS_IMAGES_FOLDER } from '~/utils/constants'
import { saveImagesToCloudinary } from '~/services/imagesProcessing'
import { ManagePostSchema } from '~/schemas'
import { TManagePostForm } from '~/types'

interface INewPostPageViewProps {
  isLogged: boolean
}

const NewPostPageView = ({ isLogged }: INewPostPageViewProps) => {
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<TManagePostForm>({
    defaultValues: {
      title: '',
      content: '',
      files: [],
      published: false,
      categories: []
    },
    resolver: zodResolver(ManagePostSchema)
  })

  const router = useRouter()

  const handleOnSubmit = (values: TManagePostForm) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      let imageUrls: string[] | null = []

      const newImages = values?.files || []

      if (newImages?.length) {
        imageUrls = await saveImagesToCloudinary(
          newImages,
          CLOUDINARY_POSTS_IMAGES_FOLDER,
          setError
        )

        if (!imageUrls) {
          return
        }
      }

      const { files, ...restValues } = values

      const newPostValues = {
        ...restValues,
        imageUrls
      }

      newPost(newPostValues)
        .then((data) => {
          setError(data?.error)
          setSuccess(data?.success)

          if (data?.success) {
            toast.success(data?.success, {
              richColors: true,
              closeButton: true,
              duration: 5000
            })

            router.back()
          }
        })
        .catch(() => {
          return setError('Somthing went wrong!')
        })
    })
  }

  const isDisabled = isPending || !isLogged

  return (
    <AppCardWrapper
      headerTitle="📄 Post"
      headerLabel="Create a new post"
    >
      <PostManageForm
        form={form}
        handleOnSubmit={handleOnSubmit}
        label="Create a new post"
        isDisabled={isDisabled}
        success={success}
        error={error}
      />
    </AppCardWrapper>
  )
}

export default NewPostPageView