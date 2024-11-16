import { prisma } from '@/database/prisma'
import { CallError } from '@/main/helpers/callError'
import { IUserRepositories } from '@/repositories/IUserRepositories'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

export interface createUser {
  name: string
  email: string
  password: string
  image?: string
}
export interface updateUser {
  id: string
  name: string
  email: string
  image?: string
}

export class UserService {
  constructor(private repository: IUserRepositories) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.repository.findAll()
    return users
  }

  async createUser({
    name,
    email,
    image,
    password,
  }: createUser): Promise<Omit<User, 'password'>> {
    const findUser = await this.repository.findByEmail(email)

    if (findUser) {
      throw new CallError('User already exists', 400)
    }

    const user = await this.repository.save({
      name,
      email,
      image,
      password: await bcrypt.hash(password, 10),
    })

    return user
  }

  async updateUser({
    name,
    email,
    id,
  }: updateUser): Promise<Omit<User, 'password'>> {
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
