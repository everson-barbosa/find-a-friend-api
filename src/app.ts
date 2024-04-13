import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";


export const app = fastify();

app.register(fastifyMultipart)