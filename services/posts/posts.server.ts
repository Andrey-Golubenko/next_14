'use server'

import { db } from '~/libs/db'
import { type Post } from '@prisma/client'

export const getSinglePost = async (
  slug: string
): Promise<FullPost | null> => {
  try {
    const initPost = await db.post.findUnique({
      where: { id: slug },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    })

    const categories = initPost?.categories?.map((singleCategory) => {
      return singleCategory?.category
    })

    const post: FullPost = { ...initPost, categories }

    return post
  } catch {
    return null
  }
}

export const getPostsByCategory = async (
  categoryId: string
): Promise<Post[] | null> => {
  try {
    const posts = await db.post.findMany({
      where: {
        categories: {
          some: {
            categoryId
          }
        }
      }
    })
    return posts
  } catch {
    return null
  }
}

export const fetchRecentPosts = async () => {
  try {
    const posts = await db.post.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { recentPosts: posts, recentPostsCount: posts?.length }
  } catch (error) {
    throw new Error('Failed ti fetch recent posts!')
  }
}
