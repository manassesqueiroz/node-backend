import type { FastifyInstance } from 'fastify'

import { PostPostController } from '../controllers/posts/postControllers'
import { GetPostController } from '../controllers/posts/getControllers'
import { PutPostController } from '../controllers/posts/putControllers'
import { DeletePostController } from '../controllers/posts/deleteControllers'

export async function Posts(app: FastifyInstance) {
  app.get('/', new GetPostController().handle)
  app.post('/', new PostPostController().handle)
  app.put('/:userId', new PutPostController().handle)
  app.delete('/:userId', new DeletePostController().handle)
}
