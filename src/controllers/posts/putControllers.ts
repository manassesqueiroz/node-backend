import { FastifyReply, FastifyRequest } from 'fastify'
import { PutPostService } from '../../services/posts/updatePostService'
import { PostSchema } from './schemas'

export class PutPostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = PostSchema.parse(request.params)
    const { id, title, content, published } = PostSchema.parse(request.body)

    const updatePost = new PutPostService().execute({
      id,
      title,
      content,
      published,
      userId,
    })

    return reply.status(200).send(updatePost)
  }
}
