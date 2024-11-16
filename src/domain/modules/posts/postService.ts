import { CallError } from '@/main/helpers/callError'
import { IPostRepositories } from '@/repositories/IPostRepositories'
import { Post } from '@prisma/client'

export interface deletePost {
  id: string
  userId: string
}
export interface updatePost extends deletePost {
  title: string
  content: string
  published: boolean
}

export type CreatePost = {
  title: string
  authorId: string
  content: string
  published: boolean
}
export class PostServices {
  constructor(private readonly repository: IPostRepositories) {}
  async createPost({ title, authorId, content, published }: CreatePost) {
    const createPost = await this.repository.save({
      title,
      authorId,
      content,
      published,
    })

    return createPost
  }

  async getPost(): Promise<Post[]> {
    console.log('oi')
    const posts = await this.repository.findAll()

    return posts
  }

  async updatePost({
    id,
    title,
    content,
    published,
    userId,
  }: updatePost): Promise<Post> {
    const exists = await this.repository.exists(id)

    if (!exists) {
      throw new CallError('Post not found', 404)
    }
    if (userId !== id) {
      throw new CallError('User not Authorized', 403)
    }

    const updatePost = await this.repository.update({
      id,
      title,
      content,
      published,
    })
    return updatePost
  }

  async deletePost({ id, userId }: deletePost): Promise<void> {
    const exists = await this.repository.exists(id)

    if (!exists) {
      throw new CallError('Post not found', 404)
    }
    if (id !== userId) {
      throw new CallError('User not Authorized', 403)
    }

    await this.repository.delete(id)
  }
}
