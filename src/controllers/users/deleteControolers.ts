import { FastifyReply, FastifyRequest } from 'fastify'
import { userSchemaId } from './schema'
import { UserService } from '../../services/userServise'

export class DeleteUserControllers {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = userSchemaId.parse(request.params)

    const userService = new UserService()

    await userService.deleteUser({ id })

    return reply.status(200).send({ message: 'User deleted with success' })
  }
}
