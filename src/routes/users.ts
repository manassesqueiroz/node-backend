import { FastifyInstance } from 'fastify'
// import { UserController } from '../modules/users/userController'
// import { UserService } from '../modules/users/userService'
// import { prisma } from '../database/prisma'
import { userFactory } from '../modules/users/userFactory'

export async function Users(app: FastifyInstance) {
  app.get('/', async (req, reply) => {
    await userFactory.getUser(req, reply)
  })
  app.post('/', async (req, reply) => {
    await userFactory.createUser(req, reply)
  })
  app.put('/:id', async (req, reply) => {
    await userFactory.updateUser(req, reply)
  })
  app.delete('/:id', async (req, reply) => {
    await userFactory.deleteUser(req, reply)
  })
}
