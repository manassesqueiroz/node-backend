"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
async function Posts(app) {
    app.get('/', async (request) => {
        const Posts = await prisma_1.prisma.post.findMany({
            orderBy: {
                content: "asc"
            }
        });
        return Posts.map((post) => {
            return {
                id: post.id,
                title: post.title,
                content: post.content,
                published: post.published,
                createdAt: post.createdAt,
                authorId: post.authorId
            };
        });
    });
    app.post('/', async (request, reply) => {
        const bodySchema = zod_1.z.object({
            title: (0, zod_1.string)(),
            content: (0, zod_1.string)(),
            published: (0, zod_1.boolean)(),
            authorId: (0, zod_1.string)()
        });
        const { authorId, published, content, title } = bodySchema.parse(request.body);
        const seachUser = await prisma_1.prisma.user.findUnique({
            where: {
                id: authorId
            }
        });
        console.log(seachUser);
        if (!seachUser) {
            return reply.status(401).send();
        }
        const createPost = await prisma_1.prisma.post.create({
            data: {
                title,
                authorId,
                content,
                published
            }
        });
        return createPost;
    });
    app.put('/:userId', async (request, reply) => {
        const bodySchema = zod_1.z.object({
            id: (0, zod_1.string)(),
            title: (0, zod_1.string)(),
            content: (0, zod_1.string)(),
            published: (0, zod_1.boolean)(),
        });
        const paramsSchema = zod_1.z.object({
            userId: (0, zod_1.string)()
        });
        const { userId } = paramsSchema.parse(request.params);
        const { id, title, content, published } = bodySchema.parse(request.body);
        console.log(userId);
        const seachPost = await prisma_1.prisma.post.findUnique({
            where: {
                id
            }
        });
        if (!seachPost) {
            return reply.status(404).send();
        }
        if (userId !== seachPost.authorId) {
            return reply.status(403).send();
        }
        const updatePost = await prisma_1.prisma.post.update({
            where: {
                id
            },
            data: {
                title,
                content,
                published
            }
        });
        return updatePost;
    });
    app.delete('/:userId', async (request, reply) => {
        const bodySchema = zod_1.z.object({
            id: (0, zod_1.string)(),
        });
        const paramsSchema = zod_1.z.object({
            userId: (0, zod_1.string)()
        });
        const { id } = bodySchema.parse(request.body);
        const { userId } = paramsSchema.parse(request.params);
        const seachPost = await prisma_1.prisma.post.findUnique({
            where: {
                id
            }
        });
        if (!seachPost) {
            return reply.status(404).send();
        }
        if (seachPost.authorId !== userId) {
            return reply.status(403).send();
        }
        const deletePost = await prisma_1.prisma.post.delete({
            where: {
                id
            }
        });
        return deletePost;
    });
}
exports.Posts = Posts;
