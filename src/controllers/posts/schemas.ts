import { boolean, string, z } from 'zod'

export const PostSchema = z.object({
  id: string().uuid({ message: 'Id inválido' }),
  title: string().length(2, { message: 'invalid title length' }),
  content: string(),
  published: boolean(),
  authorId: string().uuid({ message: 'Id inválido' }),
  userId: string().uuid({ message: 'Id inválido' }),
})
