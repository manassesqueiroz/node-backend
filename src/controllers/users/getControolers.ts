import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '../../services/userServise'

export class GetUserControllers {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userService = new UserService()

    const users = await userService.findAll()

    return reply.status(200).send(users)
  }
}
