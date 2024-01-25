import { FastifyInstance } from 'fastify'
import { UploadImageController } from '../controllers/upload/uploadImageController'

export async function Upload(app: FastifyInstance) {
  app.post('/image', new UploadImageController().handle)
}