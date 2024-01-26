import { FastifyInstance } from 'fastify'
import { uploadFactory } from '../modules/upload/uploadFactory'

export async function Upload(app: FastifyInstance) {
  app.post('/image', async (req, reply) => {
    await uploadFactory.Image(req, reply)
  })
}
