import { string, z } from 'zod'
import { prisma } from '../../database/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
class UserControllers {
  async getUsers() {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    return users
  }

  async postUser(request: FastifyRequest) {
    const bodySchema = z.object({
      name: string(),
      email: z.string(),
    })

    const { name, email } = bodySchema.parse(request.body)

    const Users = await prisma.user.create({
      data: {
        name,
        email,
      },
    })
    return Users
  }

  async putUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string(),
    })

    //  Buscando Parametros da URL
    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) {
      reply.status(401).send()
    }

    // Buscando dadas do Body
    const bodySchema = z.object({
      email: string(),
      name: string(),
    })
    const { email, name } = bodySchema.parse(request.body)

    const User = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
      },
    })
    reply.status(201).send(User)
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string(),
    })
    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) {
      return reply.status(401).send()
    }
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}

export { UserControllers }
