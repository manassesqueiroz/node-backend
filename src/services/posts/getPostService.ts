import { Post } from '@prisma/client'
import { prisma } from '../../database/prisma'

export class GetPostService {
  async execute(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        authorId: true,
        content: true,
        createdAt: true,
        published: true,
      },
    })
    return posts
  }
}
