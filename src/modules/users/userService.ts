import { CallError } from '../../helpers/callError'
import { prisma } from '../../database/prisma'
import { User } from '@prisma/client'

type createUserProps = {
  name: string
  email: string
}
type updateUserProps = {
  id: string
  name: string
  email: string
}
type deleteUserProps = {
  id: string
}

export class UserService {
  async createUser({ name, email }: createUserProps) {
    const seachUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (seachUser) {
      throw new CallError('User already exists', 400)
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })

    return user
  }

  async findAll(): Promise<User[]> {
    console.log('4wfe')

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })
    return users
  }

  async updateUser({ name, email, id }: updateUserProps): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new CallError('User not found', 404)
    }

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
      },
    })

    return updateUser
  }

  async deleteUser({ id }: deleteUserProps): Promise<void> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) {
      throw new CallError('User not found', 404)
    }

    await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
