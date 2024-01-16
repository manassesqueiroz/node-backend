import { Post } from '@prisma/client'
import { prisma } from '../../database/prisma'
import { CallError } from '../../helpers/callError'

type propsPost = {
  id: string
  title: string
  content: string
  published: boolean
  userId: string
}
export class PutPostService {
  async execute({
    id,
    title,
    content,
    published,
    userId,
  }: propsPost): Promise<Post> {
    const seachPost = await prisma.post.findUnique({
      where: {
        id,
      },
    })

    if (!seachPost) {
      throw new CallError('Post not found', 404)
    }
    if (userId !== seachPost.authorId) {
      throw new CallError('User not Authorized', 403)
    }

    const updatePost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        published,
      },
    })
    return updatePost
  }
}
