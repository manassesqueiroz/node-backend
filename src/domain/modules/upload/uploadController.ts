import { FastifyReply, FastifyRequest } from 'fastify'
import { UploadService } from './uploadService'
import { CallError } from '@/main/helpers/callError'

export class UploadImageController {
  constructor(private readonly uploadService: UploadService) {}

  async Image(request: FastifyRequest, reply: FastifyReply) {
    const upload = await request.file()

    if (!upload) {
      throw new CallError('', 400)
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      throw new CallError('Invalid file type.', 400)
    }
    const filePath = await this.uploadService.imageUpload(upload)
    // const fullUrl = request.protocol.concat('://').concat(request.hostname)
    // const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()
    return reply.status(200).send(filePath)
  }
}
