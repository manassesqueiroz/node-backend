import { FastifyReply, FastifyRequest } from 'fastify'
import { userSchema } from './schema'
import { UserService } from '../../services/userServise'

export class PostUserControllers {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = userSchema.parse(request.body)

    const userService = new UserService()

    const user = await userService.createUser({ name, email })

    return reply.status(201).send(user)
  }
}
