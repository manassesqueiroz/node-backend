import fastify from 'fastify'
import multipart from '@fastify/multipart';
import { Users } from './routes/users';
import { Posts } from './routes/Posts';

const server = fastify()
server.register(multipart)

server.register( Users ) 
server.register( Posts, {
  prefix: 'posts',
} )

server.listen({port:3000}, (err) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
  console.log('AGORA VAIII!!!!');
});