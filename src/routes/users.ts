import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import {  string,  z } from "zod";

export async function Users(app: FastifyInstance) {
  app.get("/", async (request) => {
    const users = await prisma.user.findMany({
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
    const bodySchema = z.object({
      name: string(),
      email: z.string(),
    });

    const { name, email } = bodySchema.parse(request.body);

    const Users = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return Users;
  });
  app.put("/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    });

    //  Buscando Parametros da URL
    const { id } = paramsSchema.parse(request.params);

    console.log(id);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return reply.status(401).send();
    }

    // Buscando dadas do Body
    const bodySchema = z.object({
      email: string(),
      name: string(),
    });
    const { email, name } = bodySchema.parse(request.body);

    await prisma.user.update({
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
    const paramsSchema = z.object({
      id: z.string(),
    });
    const { id } = paramsSchema.parse(request.params);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return reply.status(401).send();
    }
    await prisma.user.delete({
      where: {
        id,
      },
    });
  });
}
