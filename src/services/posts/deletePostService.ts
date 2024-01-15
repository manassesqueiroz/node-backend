import { prisma } from '../../database/prisma'
import { CallError } from '../../helpers/callError'

type PropsPost = {
  id: string
  userId: string
}
export class DeletePostServise {
  async execute({ id, userId }: PropsPost) {
    const seachPost = await prisma.post.findUnique({
      where: {
        id,
      },
    })
    if (!seachPost) {
      throw new CallError('Post not found', 404)
    }
    if (seachPost.authorId !== userId) {
      throw new CallError('User not Authorized', 403)
    }

    const deletePost = await prisma.post.delete({
      where: {
        id,
      },
    })
    return deletePost
  }
}
