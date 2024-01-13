import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

class ErrorControllers {
  async getUp(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    console.log(error)
    const status = error.statusCode ? error.statusCode : 500

    return reply.status(status).send({
      message: error.message,
      code: error.code,
      name: error.name,
    })
  }
}

export { ErrorControllers }
