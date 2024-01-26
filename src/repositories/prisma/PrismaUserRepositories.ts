import { User } from '@prisma/client'
import { createUser, updateUser } from '../../modules/users/userService'
import { IUserRepositories } from '../IUserRepositories'
import { prisma } from '../../database/prisma'

export class PrismaUserRepositories implements IUserRepositories {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  }

  async exists(id: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { id } })
    return !!user
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users
  }

  async save({ email, name, image }: createUser): Promise<User> {
    const user = await prisma.user.create({ data: { name, email, image } })
    return user
  }

  async update({ image, name, id }: updateUser): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: { name, image },
    })
    return user
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }
}
