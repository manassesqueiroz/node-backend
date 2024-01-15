import type { FastifyInstance } from 'fastify'

import { PostControllers } from '../controllers/posts/posts-contrllers'
import { CreatPostController } from '../controllers/posts/createPostControllers'

const postControllers = new PostControllers()
export async function Posts(app: FastifyInstance) {
  app.get('/', postControllers.getPosts)
  app.post('/', new CreatPostController().handle)
  app.put('/:userId', postControllers.putPost)
  app.delete('/:userId', postControllers.deletePort)
}
