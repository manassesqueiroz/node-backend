import { FastifyInstance } from 'fastify'
// import { UserController } from '../modules/users/userController'
// import { UserService } from '../modules/users/userService'
// import { prisma } from '../database/prisma'
import { userFactory } from '../modules/users/userFactory'

export async function Users(app: FastifyInstance) {
  app.get('/', userFactory().getUser)
  app.post('/', userFactory().createUser)
  app.put('/:id', userFactory().updateUser)
  app.delete('/:id', userFactory().deleteUser)
}
