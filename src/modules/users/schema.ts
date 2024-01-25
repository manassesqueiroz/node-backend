import { string, z } from 'zod'

export const userSchema = z.object({
  //   id: string().uuid({ message: 'Id inválido' }),
  name: string().min(2, { message: 'invalid name length' }),
  email: z.string().email({ message: 'Email inválido' }),
  //   authorId: string().uuid({ message: 'Id inválido' }),
})
export const userSchemaId = z.object({
  id: string().uuid({ message: 'Id inválido' }),
})
