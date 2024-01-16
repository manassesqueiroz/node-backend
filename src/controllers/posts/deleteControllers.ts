import { DeletePostServise } from '../../services/posts/deletePostService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { postSchemaId, postSchemaUserId } from './schemas'

export class DeletePostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = postSchemaId.parse(request.body)
    const { userId } = postSchemaUserId.parse(request.params)

    const deletePostServise = new DeletePostServise()

    await deletePostServise.execute({ id, userId })

    return reply.status(200).send({ message: 'Post deleted with success' })
  }
}
