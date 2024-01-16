import { string, z } from 'zod'
import { prisma } from '../../database/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { CallError } from '../../helpers/callError'
class UserControllers {
  async getUsers() {
    

    throw new CallError('Error', 401)

    return users
  }

  async putUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string(),
    })
    // Buscando dadas do Body
    const bodySchema = z.object({
      email: string(),
      name: string(),
    })

   

    
    reply.status(201).send(User)
  }

 

export { UserControllers }
