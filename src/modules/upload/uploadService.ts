import * as fastifyMultipart from '@fastify/multipart'
import { SupabaseClient } from '@supabase/supabase-js'
import { CallError } from '../../helpers/callError'

export class UploadService {
  constructor(private supabase: SupabaseClient) {}

  async imageUpload(image: fastifyMultipart.MultipartFile) {
    const time = new Date().getTime().toString()

    const fileName = time.concat(image.filename).split(' ').join('_')

    const { data, error } = await this.supabase.storage
      .from('file')
      .upload(fileName, image.file, {
        upsert: true,
        contentType: image.mimetype,
      })

    if (error) {
      throw new CallError(error.message, 400)
    }

    return data
  }
}
