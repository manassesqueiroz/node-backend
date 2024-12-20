import { CreatePost, updatePost } from '@/domain/modules/posts/postService'
import { Post } from '@prisma/client'

export abstract class IPostRepositories {
  abstract exists(id: string): Promise<boolean>
  abstract findAll(): Promise<Post[]>
  abstract save({
    title,
    content,
    published,
    authorId,
  }: CreatePost): Promise<Post>

  abstract update({
    title,
    content,
    published,
    id,
  }: Omit<updatePost, 'userId'>): Promise<Post>

  abstract delete(id: string): Promise<void>
}
