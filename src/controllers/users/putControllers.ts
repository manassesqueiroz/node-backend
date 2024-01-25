import { FastifyReply, FastifyRequest } from 'fastify'
import { userSchema, userSchemaId } from './schema'
import { UserService } from '../../services/userServise'

export class PutUserControllers {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, name } = userSchema.parse(request.body)
    const { id } = userSchemaId.parse(request.params)

    const userService = new UserService()
    const user = await userService.updateUser({ email, name, id })

    return reply.status(200).send(user)
  }
}
