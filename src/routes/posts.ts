import type { FastifyInstance } from 'fastify'
import { PostController } from '../controllers/postController'
import { PostServices } from '../services/postServise'

const postController = new PostController(new PostServices())

export async function Posts(app: FastifyInstance) {
  app.get('/', postController.getPosts)
  app.post('/', postController.createPost)
  app.put('/:userId', postController.updatePost)
  app.delete('/:userId', postController.deletePost)
}
