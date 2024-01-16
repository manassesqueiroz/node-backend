import { prisma } from '../../database/prisma'

type propsPost = {
  title: string
  authorId: string
  content: string
  published: boolean
}
export class PostPostService {
  async execute({ title, authorId, content, published }: propsPost) {
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
