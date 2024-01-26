import { Post, PrismaClient } from '@prisma/client'
import { CallError } from '../../helpers/callError'

type deletePost = {
  id: string
  userId: string
}
type updatePost = {
  id: string
  title: string
  content: string
  published: boolean
  userId: string
}
type CreatePost = {
  title: string
  authorId: string
  content: string
  published: boolean
}
export class PostServices {
  constructor(private readonly prisma: PrismaClient) {}
  async createPost({ title, authorId, content, published }: CreatePost) {
    const createPost = await this.prisma.post.create({
      data: {
        title,
        authorId,
        content,
        published,
      },
    })

    return createPost
  }

  async deletePost({ id, userId }: deletePost): Promise<void> {
    const seachPost = await this.prisma.post.findUnique({
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

    await this.prisma.post.delete({
      where: {
        id,
      },
    })
  }

  async getPost(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany()

    return posts
  }

  async updatePost({
    id,
    title,
    content,
    published,
    userId,
  }: updatePost): Promise<Post> {
    const seachPost = await this.prisma.post.findUnique({
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

    const updatePost = await this.prisma.post.update({
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
