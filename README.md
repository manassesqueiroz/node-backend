<h1>Projeto de Backend</h1>
<p>Este é um projeto de backend desenvolvido utilizando Node.js, Zod, Fastify e TypeScript. O objetivo deste projeto é criar uma API RESTful segura e escalável.</p>

<h2>Tecnologias Utilizadas</h2>
<ul>
  <li>Node.js: Ambiente de execução JavaScript assíncrono e de código aberto, utilizado para desenvolvimento de servidores.</li>
  <li>Zod: Biblioteca de validação de esquemas TypeScript eficiente, utilizada para garantir a validade das requisições recebidas pela API.</li>
  <li>Fastify: Framework web rápido e eficiente construído em cima do Node.js, ideal para construir APIs escaláveis e de alto desempenho.</li>
  <li>TypeScript: Linguagem de programação que adiciona tipagem estática ao JavaScript, proporcionando um código mais robusto e com menos erros.</li>
</ul>

<h2>Banco de Dados</h2>
<p>Para persistência de dados, foi utilizado o SQLite3 como banco de dados e o Prisma como ORM (Object-Relational Mapping). O Prisma facilita o trabalho com bancos de dados, tornando a interação com eles mais intuitiva e produtiva. As tabelas do banco de dados utilizadas neste projeto são:</p>

<ul>
  <li>Tabela User: Armazena informações sobre os usuários da aplicação, como nome, e-mail, data de criação e atualização, além de relacionamentos com os posts.</li>
  <li>Tabela Post: Armazena informações sobre as postagens, como título, conteúdo, data de criação, se foi publicado e o autor da postagem.</li>
</ul>

<h2>Trecho de Código</h2>
<p>Segue abaixo um trecho de código exemplificando a implementação do backend:</p>

<pre>
  <code>
  import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { string, z } from "zod";

export async function Users(app: FastifyInstance) {
  // Endpoint GET para obter todos os usuários
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

  // Endpoint POST para criar um novo usuário
  app.post("/", async (request) => {
    const bodySchema = z.object({
      name: string(),
      email: z.string(),
    });

    const { name, email } = bodySchema.parse(request.body);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return newUser;
  });

  // Endpoint PUT para atualizar um usuário existente
  app.put("/:id", async (request, reply) => {
    // Validação dos parâmetros da URL
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

    // Validação dos dados do Body
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

  // Endpoint DELETE

  </code>
</pre>

