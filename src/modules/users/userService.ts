import { CallError } from '../../helpers/callError'
import { prisma } from '../../database/prisma'
import { User } from '@prisma/client'
import { IUserRepositories } from '../../repositories/IUserRepositories'

export interface createUser {
  name: string
  email: string
}
export interface updateUser extends createUser {
  id: string
}

export class UserService {
  constructor(private readonly repository: IUserRepositories) {}

  async findAll(): Promise<User[]> {
    const users = await this.repository.findAll()
    return users
  }

  async createUser({ name, email }: createUser): Promise<User> {
    const findUser = await this.repository.findByEmail(email)

    if (findUser) {
      throw new CallError('User already exists', 400)
    }

    const user = await this.repository.save({ name, email })

    return user
  }

  async updateUser({ name, email, id }: updateUser): Promise<User> {
    const exists = await this.repository.exists(id)

    if (!exists) {
      throw new CallError('User not found', 404)
    }

    const updateUser = await this.repository.update({ name, email, id })

    return updateUser
  }

  async deleteUser(id: string): Promise<void> {
    const exists = await this.repository.exists(id)

    if (!exists) {
      throw new CallError('User not found', 404)
    }

    await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
