import { FastifyReply, FastifyRequest } from 'fastify'
import { GetUserService } from '../../services/users/findUserService'

export class GetUserControllers {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getUserService = new GetUserService()

    const users = await getUserService.execute()

    return reply.status(200).send(users)
  }
}
