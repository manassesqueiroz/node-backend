import { FastifyReply, FastifyRequest } from 'fastify'
import { UploadFile } from '../../external/supabase/supabase-uploud-files'
import { CallError } from '../../helpers/callError'
import { supabase } from '../../external/supabase/createClient'

const uploadFile = new UploadFile(supabase)
export class UploadImageController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const upload = await request.file()

    if (!upload) {
      throw new CallError('', 400)
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      throw new CallError('Invalid file type.', 400)
    }

    const filePath = await uploadFile.image(upload)
    console.log(filePath.path)
    // const fullUrl = request.protocol.concat('://').concat(request.hostname)
    // const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()
    return reply.status(200).send(filePath)
  }
}
