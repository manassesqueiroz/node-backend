import type { FastifyInstance } from 'fastify'
import { postFactory } from '../modules/posts/postFactory'

export async function Posts(app: FastifyInstance) {
  app.get('/', async (req, reply) => {
    await postFactory.getPosts(req, reply)
  })
  app.post('/', async (req, reply) => {
    await postFactory.createPost(req, reply)
  })
  app.put('/:userId', async (req, reply) => {
    await postFactory.updatePost(req, reply)
  })
  app.delete('/:userId', async (req, reply) => {
    await postFactory.deletePost(req, reply)
  })
}
