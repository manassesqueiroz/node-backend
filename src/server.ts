import fastify from 'fastify'
import multipart from '@fastify/multipart'
import { Users } from './routes/users'
import { Posts } from './routes/posts'
import { Upload } from './routes/upload'
import { ErrorControllers } from './middleware/errors'
import { resolve } from 'node:path'
import { fastifyStatic } from '@fastify/static'

const errorControllers = new ErrorControllers()

const server = fastify()

server.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads/',
})

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

server.register(Upload, {
  prefix: 'upload',
})

server.setErrorHandler(errorControllers.getUp)

server.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err)
    process.exit(1)
  }
  console.log('Server running: http://localhost:3000/')
})
