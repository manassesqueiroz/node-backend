import { FastifyReply, FastifyRequest } from 'fastify'
import { PutUserService } from '../../services/user/updateUserService'
import { boolean, string, z } from 'zod'

export class PutPostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      id: string().uuid({ message: 'Id inválido' }),
      title: string(),
      content: string(),
      published: boolean(),
    })
    const paramsSchema = z.object({
      userId: string(),
    })

    const { userId } = paramsSchema.parse(request.params)
    const { id, title, content, published } = bodySchema.parse(request.body)

    const updatePost = new PutUserService().execute({
      id,
      title,
      content,
      published,
      userId,
    })

    return updatePost
  }
}
