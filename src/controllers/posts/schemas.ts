import { boolean, string, z } from 'zod'

const bodySchema = z.object({
  title: string().length(2, { message: 'invalid title length' }),
  content: string(),
  published: boolean(),
  authorId: string(),
})

export { bodySchema }
