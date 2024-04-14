import fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(multipart)

app.register(petsRoutes)
