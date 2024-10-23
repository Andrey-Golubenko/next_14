'use server'

import { db } from '~/libs/db'
import { UserRole } from '@prisma/client'
import {
  fetchPostsIdsInCategory,
  fetchSingleCategoryById,
  fetchUncategorizedCategory
} from '~/services/categories'
import { getUserById } from '~/services/user'
import { updatePostsCategories } from '~/actions/update-posts-categories'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

export const deleteCategory = async (categoryId: string) => {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { error: 'Unauthorized!' }
    }

    const dbUser = await getUserById(user?.id)

    if (!dbUser) {
      return { error: 'Unauthorized!' }
    }

    const category = await fetchSingleCategoryById(categoryId)

    if (!category) {
      return { error: 'There are no category for deleting!' }
    }

    if (user?.role !== UserRole.ADMIN) {
      return { error: 'You have no permission to delete this category!' }
    }

    const uncategorizedCategory = await fetchUncategorizedCategory()

    if (uncategorizedCategory?.id === categoryId) {
      return { error: 'Cannot delete "Uncategorized" category!' }
    }

    if (!uncategorizedCategory) {
      return {
        error: 'There is no "Uncategorized" category to link post with!'
      }
    }

    const postsInCategory = await fetchPostsIdsInCategory(categoryId)

    const postsCategoriesUpdating = await updatePostsCategories({
      postsInCategory,
      categoryId,
      uncategorizedCategoryId: uncategorizedCategory?.id
    })

    if (postsCategoriesUpdating?.error) {
      return {
        error: 'Failed to update post categories before deleting category!'
      }
    }

    await db.categories.delete({
      where: { id: categoryId }
    })

    return { success: 'The category was successfully deleted!' }
  } catch (error) {
    console.error('Error while deleting category:', error)
    return { error: 'Failed to delete category!' }
  }
}