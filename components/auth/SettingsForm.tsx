'use client'

import { useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import type { Session } from 'next-auth'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '~/components/ui/form'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import TextField from '~/components/shared/TextField'
import PasswordField from '~/components/shared/PasswordField'
import SelectField from '~/components/shared/SelectField'
import SwitchField from '~/components/shared/SwitchField'
import LoadableButton from '~/components/shared/LoadableButton'
import { editUser } from '~/actions/edit-user'
import { useSession } from 'next-auth/react'
import { emptyStringToUndefined } from '~/utils/helpers'
import { SettingsSchema } from '~/schemas'

interface ISettingsFormProps {
  session: Session | null
}

const SettingsForm = ({ session }: ISettingsFormProps) => {
  const user = session?.user
  const { update } = useSession()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    defaultValues: {
      name: user?.name as string | undefined,
      email: user?.email,
      password: '',
      newPassword: '',
      role: user?.role,
      isTwoFactorEnabled: user?.isTwoFactorEnabled
    },
    resolver: zodResolver(SettingsSchema)
  })

  const onHandleSubmit = (values: z.infer<typeof SettingsSchema>) => {
    const preparedValues = emptyStringToUndefined(values)

    startTransition(() => {
      editUser(preparedValues)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update()
            setSuccess(data.success)
          }
        })
        .catch(() => {
          return 'Somthing went wrong!'
        })
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-grow flex-col justify-evenly space-y-6"
        onSubmit={form.handleSubmit(onHandleSubmit)}
      >
        <div className="space-y-4">
          <TextField
            name="name"
            type="text"
            placeholder="John Doe"
            label="Name"
            control={form.control}
            isPending={isPending}
          />

          {!user?.isOAuth && (
            <>
              <TextField
                name="email"
                type="email"
                placeholder="email@example.com"
                label="Email"
                control={form.control}
                isPending={isPending}
              />

              <PasswordField
                name="password"
                label="Password"
                control={form.control}
                isPending={isPending}
              />

              <PasswordField
                name="newPassword"
                label="New password"
                control={form.control}
                isPending={isPending}
              />
            </>
          )}

          <SelectField
            name="role"
            label="Role"
            placeholder="Select a Role"
            control={form.control}
            isPending={isPending}
          />

          {!user?.isOAuth && (
            <SwitchField
              name="isTwoFactorEnabled"
              label="Two Factor Authentication"
              description="Enabled two factor authentication for your account"
              control={form.control}
              isPending={isPending}
            />
          )}
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <LoadableButton
          type="submit"
          isDisabled={isPending}
          label="Save"
        />
      </form>
    </Form>
  )
}

export default SettingsForm
