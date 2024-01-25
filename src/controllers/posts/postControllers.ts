import { FastifyReply, FastifyRequest } from 'fastify'
import { postSchemaPost } from './schemas'
import { PostServices } from '../../services/postServise'

export class PostPostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { authorId, published, content, title } = postSchemaPost.parse(
      request.body,
    )
    const postService = new PostServices()

    const post = await postService.createPost({
      title,
      authorId,
      content,
      published,
    })

    return reply.status(201).send(post)
  }
}
