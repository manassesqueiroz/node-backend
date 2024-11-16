import { uploadFactory } from '@/domain/modules/upload/uploadFactory'
import { FastifyInstance } from 'fastify'

export async function Upload(app: FastifyInstance) {
  app.post('/image', async (req, reply) => {
    await uploadFactory.Image(req, reply)
  })
}
