import { FastifyReply, FastifyRequest } from 'fastify'
import { userSchema } from './schema'
import { CreateUserService } from '../../services/users/createUserService'

export class PostUserControllers {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = userSchema.parse(request.body)

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ name, email })

    return reply.status(201).send(user)
  }
}
