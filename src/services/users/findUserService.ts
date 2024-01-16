import { prisma } from '../../database/prisma'

export class GetUserService {
  async execute() {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    return users
  }
}
