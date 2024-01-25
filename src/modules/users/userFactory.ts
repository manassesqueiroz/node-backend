import { UserController } from './userController'
import { UserService } from './userService'

export const userFactory = () => {
  const userService = new UserService()
  const userController = new UserController(userService)
  return userController
}
