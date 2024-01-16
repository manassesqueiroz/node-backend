import { prisma } from '../../database/prisma'
import { CallError } from '../../helpers/callError'

type propsUser = {
  name: string
  email: string
}
export class CreateUserService {
  async execute({ name, email }: propsUser) {
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
}
