import { User } from '@prisma/client'
import { createUser, updateUser } from '../modules/users/userService'

export abstract class IUserRepositories {
  abstract findByEmail(email: string): Promise<User | null>
  abstract exists(id: string): Promise<boolean>
  abstract findAll(): Promise<User[]>
  abstract save({ email, name }: createUser): Promise<User>
  abstract update({ email, name, id }: updateUser): Promise<User>
  abstract delete(id: string): Promise<void>
}
