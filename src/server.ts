import fastify from 'fastify'
import multipart from '@fastify/multipart'
import { Users } from './routes/users'
import { Posts } from './routes/posts'
import { ErrorControllers } from './middleware/errors'

const errorControllers = new ErrorControllers()

const server = fastify()
server.register(multipart)

server.get('/test', () => {
  return 'hello world'
})
server.register(Users, {
  prefix: 'users',
})

server.register(Posts, {
  prefix: 'posts',
})

server.setErrorHandler(errorControllers.getUp)

server.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err)
    process.exit(1)
  }
  console.log('Server running: http://localhost:3000/')
})
