import { PrismaPostRepositories } from '../../repositories/prisma/PrismaPostRepositories'
import { PostController } from './postController'
import { PostServices } from './postService'

export const postFactory = () => {
  const prismaPostRepositories = new PrismaPostRepositories()
  const postService = new PostServices(prismaPostRepositories)
  const userController = new PostController(postService)
  return userController
}
