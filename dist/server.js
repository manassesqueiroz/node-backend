"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const users_1 = require("./routes/users");
const Posts_1 = require("./routes/Posts");
const server = (0, fastify_1.default)();
server.register(multipart_1.default);
server.get('/test', () => {
    return 'hello world';
});
server.register(users_1.Users);
server.register(Posts_1.Posts, {
    prefix: 'posts',
});
server.listen({ port: 3000 }, (err) => {
    if (err) {
        console.error('Erro ao iniciar o servidor:', err);
        process.exit(1);
    }
    console.log('AGORA VAIII!!!!');
});
