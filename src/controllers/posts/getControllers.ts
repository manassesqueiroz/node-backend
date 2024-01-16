import { FastifyReply, FastifyRequest } from 'fastify'
import { GetPostService } from '../../services/posts/getPostService'

export class GetPostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getPostService = new GetPostService()

    const post = await getPostService.execute()

    return reply.status(200).send(post)
  }
}
