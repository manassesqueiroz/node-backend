import { FastifyReply, FastifyRequest } from 'fastify'
import { postSchemaPut, schemaUserId } from './schemas'
import { PostServices } from '../../services/postServise'

export class PutPostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = schemaUserId.parse(request.params)
    const { id, title, content, published } = postSchemaPut.parse(request.body)

    const postService = new PostServices()

    const updatePost = await postService.updatePost({
      id,
      title,
      content,
      published,
      userId,
    })

    return reply.status(200).send(updatePost)
  }
}
