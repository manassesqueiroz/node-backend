import { FastifyReply, FastifyRequest } from 'fastify'
import { postSchemaPost } from './schemas'
import { PostPostService } from '../../services/posts/createPostService'

export class PostPostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { authorId, published, content, title } = postSchemaPost.parse(
      request.body,
    )
    const postPostService = new PostPostService()

    const post = await postPostService.execute({
      title,
      authorId,
      content,
      published,
    })

    return reply.status(201).send(post)
  }
}
