import { PrismaUserRepositories } from '@/repositories/prisma/PrismaUserRepositories'
import { UserController } from './userController'
import { UserService } from './userService'

const UserFactory = () => {
  const prismaUserRepositories = new PrismaUserRepositories()
  const userService = new UserService(prismaUserRepositories)

  const userController = new UserController(userService)
  return userController
}

export const userFactory = UserFactory()
