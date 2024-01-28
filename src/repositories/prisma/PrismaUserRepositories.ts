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

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        updatedAt: true,
        createdAt: true,
      },
    })
    return users
  }

  async save({
    email,
    name,
    image,
    password,
  }: createUser): Promise<Omit<User, 'password'>> {
    const user = await prisma.user.create({
      data: { name, email, image, password },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        updatedAt: true,
        createdAt: true,
      },
    })
    return user
  }

  async update({
    image,
    name,
    id,
  }: updateUser): Promise<Omit<User, 'password'>> {
    const user = await prisma.user.update({
      where: { id },
      data: { name, image },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        updatedAt: true,
        createdAt: true,
      },
    })
    return user
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } })
  }
}
