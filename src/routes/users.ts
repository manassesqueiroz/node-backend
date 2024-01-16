import { FastifyInstance } from 'fastify'
import { GetUserControllers } from '../controllers/users/getControolers'
import { PostUserControllers } from '../controllers/users/postControllers'
import { PutUserControllers } from '../controllers/users/putControllers'
import { DeleteUserControllers } from '../controllers/users/deleteControolers'

export async function Users(app: FastifyInstance) {
  app.get('/', new GetUserControllers().handle)
  app.post('/', new PostUserControllers().handle)
  app.put('/:id', new PutUserControllers().handle)
  app.delete('/:id', new DeleteUserControllers().handle)
}
