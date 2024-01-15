import { FastifyReply, FastifyRequest } from 'fastify'
import { GetPostService } from '../../services/posts/getPostService'

export class GetPostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const post = new GetPostService().execute()

    return reply.status(200).send(post)
  }
}
