import { Post } from '@prisma/client'
import { prisma } from '../../database/prisma'
import { CreatePost, updatePost } from '../../modules/posts/postService'
import { IPostRepositories } from '../IPostRepositories'

export class PrismaPostRepositories implements IPostRepositories {
  async exists(id: string): Promise<boolean> {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    })
    return !!post
  }

  async findAll(): Promise<Post[]> {
    const posts = await prisma.post.findMany()
    return posts
  }

  async save({
    title,
    content,
    published,
    authorId,
  }: CreatePost): Promise<Post> {
    const user = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
      },
    })
    return user
  }

  async update({
    title,
    content,
    published,
    id,
  }: Omit<updatePost, 'userId'>): Promise<Post> {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        published,
      },
    })
    return post
  }

  async delete(id: string): Promise<void> {
    await prisma.post.delete({ where: { id } })
  }
}
