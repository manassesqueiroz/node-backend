import { FastifyReply, FastifyRequest } from 'fastify'
import { postSchemaId, schemaUserId } from './schemas'
import { PostServices } from '../../services/postServise'

export class DeletePostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = postSchemaId.parse(request.body)
    const { userId } = schemaUserId.parse(request.params)

    const deletePostServise = new PostServices()

    await deletePostServise.deletePost({ id, userId })

    return reply.status(200).send({ message: 'Post deleted with success' })
  }
}
