import { FastifyReply, FastifyRequest } from 'fastify'
import { PutPostService } from '../../services/posts/updatePostService'
import { postSchemaPut, postSchemaUserId } from './schemas'

export class PutPostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = postSchemaUserId.parse(request.params)
    const { id, title, content, published } = postSchemaPut.parse(request.body)

    const putPostService = new PutPostService()

    const updatePost = await putPostService.execute({
      id,
      title,
      content,
      published,
      userId,
    })

    return reply.status(200).send(updatePost)
  }
}
