import { prisma } from '../../database/prisma'
import { CallError } from '../../helpers/callError'

type propsUser = {
  id: string
}
export class DeleteUserService {
  async execute({ id }: propsUser) {
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
