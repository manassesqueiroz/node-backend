import type { FastifyInstance } from 'fastify'
import { PostController } from '../modules/posts/postController'
import { PostServices } from '../modules/posts/postService'
import { prisma } from '../database/prisma'

const postService = new PostServices(prisma)
const postController = new PostController(postService)

export async function Posts(app: FastifyInstance) {
  app.get('/', postController.getPosts)
  app.post('/', postController.createPost)
  app.put('/:userId', postController.updatePost)
  app.delete('/:userId', postController.deletePost)
}
