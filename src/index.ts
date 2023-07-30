import fastify, { FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import client from "./client";
import { toInt } from "radash";

const server = fastify();
server.register(cors, {
  origin: false,
});

server.get("/ping", async () => {
  return "pong\n";
});

server.get(
  "/accounts",
  async (
    request: FastifyRequest<{
      Querystring: { id: string; cursor?: string };
    }>
  ) => {
    const { id, cursor } = request.query;
    return await client({ userId: id }).accounts(cursor);
  }
);

const port = toInt(process.env.PORT) ?? 8080;
server.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
