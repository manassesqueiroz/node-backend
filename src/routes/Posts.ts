import type { FastifyInstance } from 'fastify'

import { PostControllers } from '../controllers/posts/posts-contrllers'

const postControllers = new PostControllers()
export async function Posts(app: FastifyInstance) {
  app.get('/', postControllers.getPosts)
  app.post('/', postControllers.postPost)
  app.put('/:userId', postControllers.putPost)
  app.delete('/:userId', postControllers.deletePort)
}
