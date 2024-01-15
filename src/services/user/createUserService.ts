import { prisma } from '../../database/prisma'
import { CallError } from '../../helpers/callError'

type Post = {
  title: string
  authorId: string
  content: string
  published: boolean
}
class CreateUserService {
  async execute({ title, authorId, content, published }: Post) {
    const seachUser = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    })

    if (!seachUser) throw new CallError('Error', 401)

    const createPost = await prisma.post.create({
      data: {
        title,
        authorId,
        content,
        published,
      },
    })

    return createPost
  }
}
export { CreateUserService }
