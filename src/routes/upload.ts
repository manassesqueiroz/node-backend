import { FastifyInstance } from 'fastify'
import { CallError } from '../helpers/callError'
import { uploadFile } from '../external/supabase'

export async function Upload(app: FastifyInstance) {
  app.post('/image', async (request, reply) => {
    const upload = await request.file()

    if (!upload) {
      throw new CallError('', 400)
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      throw new CallError('Invalid file type.', 400)
    }

    const filePath = await uploadFile(upload)
    console.log(filePath)
    // const fullUrl = request.protocol.concat('://').concat(request.hostname)
    // const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()
    return reply.status(200).send(filePath)
  })
}
