import { FastifyReply, FastifyRequest } from 'fastify'
import { PostServices } from '../../services/postServise'

export class GetPostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const postService = new PostServices()

    const post = await postService.getPost()

    return reply.status(200).send(post)
  }
}
