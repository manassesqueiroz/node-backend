import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from './userService'
import { userSchema, userSchemaId } from './schema'

export class UserController {
  constructor(public readonly userService: UserService) {}

  async getUser(request: FastifyRequest, reply: FastifyReply) {
    const users = await this.userService.findAll()

    return reply.status(200).send(users)
  }

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = userSchema.parse(request.body)
    const user = await this.userService.createUser({ name, email })

    return reply.status(201).send(user)
  }

  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    const { email, name } = userSchema.parse(request.body)
    const { id } = userSchemaId.parse(request.params)
    const user = await this.userService.updateUser({ email, name, id })

    return reply.status(200).send(user)
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = userSchemaId.parse(request.params)
    await this.userService.deleteUser(id)

    return reply.status(200).send({ message: 'User deleted with success' })
  }
}
