import { boolean, string, z } from 'zod'

export const postSchemaPut = z.object({
  id: string().uuid({ message: 'Id inválido' }),
  title: string().min(2, { message: 'invalid title length' }),
  content: string(),
  published: boolean(),
})

export const postSchemaPost = z.object({
  title: string().min(2, { message: 'invalid title length' }),
  content: string(),
  published: boolean(),
  authorId: string().uuid({ message: 'Id inválido' }),
})
export const postSchemaUserId = z.object({
  userId: string().uuid({ message: 'Id inválido' }),
})

export const postSchemaId = z.object({
  id: string().uuid({ message: 'Id inválido' }),
})
