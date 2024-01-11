import { FastifyInstance } from 'fastify'
import { UserControllers } from '../controllers/users/users-controllers'

const userControllers = new UserControllers()
export async function Users(app: FastifyInstance) {
  app.get('/', userControllers.getUsers)
  app.post('/', userControllers.postUser)
  app.put('/:id', userControllers.putUser)
  app.delete('/:id', userControllers.deleteUser)
}
