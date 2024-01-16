import { prisma } from '../../database/prisma'
import { CallError } from '../../helpers/callError'

type propsUser = {
  id: string
  name: string
  email: string
}
export class UpdateUserService {
  async execute({ name, email, id }: propsUser) {
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
}
