import { PrismaPostRepositories } from '@/repositories/prisma/PrismaPostRepositories'
import { PostController } from './postController'
import { PostServices } from './postService'

const PostFactory = () => {
  const prismaPostRepositories = new PrismaPostRepositories()
  const postService = new PostServices(prismaPostRepositories)
  return new PostController(postService)
}

export const postFactory = PostFactory()
