import fastifyMultipart from "@fastify/multipart";
import { app } from "./app";
import { env } from "./env";


app.register(fastifyMultipart)

app
  .listen({
    port: env.PORT,
  })
  .then((port) => {
    console.log("Find a Friend 🐶 [Running...]", port);
  });
