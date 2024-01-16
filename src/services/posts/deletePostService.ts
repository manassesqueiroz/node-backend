import { prisma } from '../../database/prisma'
import { CallError } from '../../helpers/callError'

type propsPost = {
  id: string
  userId: string
}
export class DeletePostServise {
  async execute({ id, userId }: propsPost) {
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

    await prisma.post.delete({
      where: {
        id,
      },
    })
  }
}
