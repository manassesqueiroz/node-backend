import { User } from '@prisma/client'
import { createUser, updateUser } from '../modules/users/userService'

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
