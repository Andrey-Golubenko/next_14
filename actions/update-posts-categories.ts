import { db } from '~/libs/db'

interface IUpdatePostsCategoriesProps {
  postsInCategory: {
    postId: string
  }[]
  categoryId: string
  uncategorizedCategoryId: string
}

export const updatePostsCategories = async ({
  postsInCategory,
  categoryId,
  uncategorizedCategoryId
}: IUpdatePostsCategoriesProps) => {
  try {
    const updatePromises = postsInCategory.map(async (postCategory) => {
      const { postId } = postCategory

      const categoryCount = await db.postCategories.count({
        where: { postId }
      })

      if (categoryCount === 1) {
        return db.postCategories.update({
          where: {
            postId_categoryId: {
              postId,
              categoryId
            }
          },
          data: {
            categoryId: uncategorizedCategoryId
          }
        })
      }

      return undefined
    })

    await Promise.all(updatePromises)

    return { success: 'Posts categories were successfuly updated!' }
  } catch (error) {
    console.error('Failed to update posts categories:', error)
    return { error: 'Failed to update posts categories!' }
  }
}
