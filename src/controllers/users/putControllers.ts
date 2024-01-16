import { FastifyReply, FastifyRequest } from 'fastify'
import { userSchema, userSchemaId } from './schema'
import { UpdateUserService } from '../../services/users/updateUserService'

export class PutUserControllers {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, name } = userSchema.parse(request.body)
    const { id } = userSchemaId.parse(request.params)

    const updateUserService = new UpdateUserService()
    const user = await updateUserService.execute({ email, name, id })

    return reply.status(200).send(user)
  }
}
