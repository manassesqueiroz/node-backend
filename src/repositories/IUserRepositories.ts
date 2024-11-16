import { createUser, updateUser } from '@/domain/modules/users/userService'
import { User } from '@prisma/client'

export abstract class IUserRepositories {
  abstract findByEmail(email: string): Promise<User | null>
  abstract exists(id: string): Promise<boolean>
  abstract findAll(): Promise<Omit<User, 'password'>[]>
  abstract save({
    email,
    name,
    image,
    password,
  }: createUser): Promise<Omit<User, 'password'>>

  abstract update({
    image,
    name,
    id,
  }: updateUser): Promise<Omit<User, 'password'>>

  abstract delete(id: string): Promise<void>
}
