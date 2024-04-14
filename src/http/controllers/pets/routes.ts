import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetchByDistrict } from './fetch-by-district'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', create)

  app.get('/pets/district/:districtId', fetchByDistrict)
}
