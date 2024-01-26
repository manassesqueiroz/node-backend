import { PostController } from './postController'
import { PostServices } from './postService'

export const postFactory = () => {
  const postService = new PostServices()
  const userController = new PostController(postService)
  return userController
}
