import fastify from "fastify";
import cors from '@fastify/cors'
import multipart from "@fastify/multipart";


export const app = fastify();

app.register(cors, {
    origin: true
})

app.register(multipart)