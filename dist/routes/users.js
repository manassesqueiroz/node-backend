"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
async function Users(app) {
    app.get("/", async (request) => {
        const users = await prisma_1.prisma.user.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });
        return users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        });
    });
    app.post("/", async (request) => {
        const bodySchema = zod_1.z.object({
            name: (0, zod_1.string)(),
            email: zod_1.z.string(),
        });
        const { name, email } = bodySchema.parse(request.body);
        const Users = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
            },
        });
        return Users;
    });
    app.put("/:id", async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            id: zod_1.z.string(),
        });
        //  Buscando Parametros da URL
        const { id } = paramsSchema.parse(request.params);
        console.log(id);
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            return reply.status(401).send();
        }
        // Buscando dadas do Body
        const bodySchema = zod_1.z.object({
            email: (0, zod_1.string)(),
            name: (0, zod_1.string)(),
        });
        const { email, name } = bodySchema.parse(request.body);
        await prisma_1.prisma.user.update({
            where: {
                id,
            },
            data: {
                email,
                name,
            },
        });
    });
    app.delete("/:id", async (request, reply) => {
        const paramsSchema = zod_1.z.object({
            id: zod_1.z.string(),
        });
        const { id } = paramsSchema.parse(request.params);
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            return reply.status(401).send();
        }
        await prisma_1.prisma.user.delete({
            where: {
                id,
            },
        });
    });
}
exports.Users = Users;
