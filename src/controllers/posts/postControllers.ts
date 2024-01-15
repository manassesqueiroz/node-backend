import { FastifyReply, FastifyRequest } from 'fastify'
import { PostSchema } from './schemas'
import { PostPostService } from '../../services/posts/createPostService'

export class PostPostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { authorId, published, content, title } = PostSchema.parse(
      request.body,
    )
    const post = new PostPostService().execute({
      title,
      authorId,
      content,
      published,
    })

    return reply.status(201).send(post)
  }
}
