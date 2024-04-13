import { app } from "./app";
import { env } from "./env";

app
  .listen({
    port: env.PORT,
  })
  .then((port) => {
    console.log("Find a Friend 🐶 [Running...]", port);
  });
