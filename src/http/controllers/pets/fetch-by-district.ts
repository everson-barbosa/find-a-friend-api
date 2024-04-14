import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchPetsInDistrictUseCase } from '../../../use-cases/factories/make-fetch-pets-in-district'
import { z } from 'zod'

export async function fetchByDistrict(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsQuerySchema = z.object({
    ageId: z.string().optional(),
    energyLevelId: z.string().optional(),
    environmentId: z.string().optional(),
    levelOfIndependenceId: z.string().optional(),
    sizeId: z.string().optional(),
  })

  const fetchPetsParamsSchema = z.object({
    districtId: z.coerce.number(),
  })

  const { ageId, energyLevelId, environmentId, levelOfIndependenceId, sizeId } =
    fetchPetsQuerySchema.parse(request.query)

  const { districtId } = fetchPetsParamsSchema.parse(request.params)

  const fetchPetsInDistrict = makeFetchPetsInDistrictUseCase()

  const { pets } = await fetchPetsInDistrict.execute({
    districtId,
    filters: {
      age_id: ageId,
      energy_level_id: energyLevelId,
      environment_id: environmentId,
      level_of_independence_id: levelOfIndependenceId,
      size_id: sizeId,
    },
  })

  reply.status(200).send({ pets })
}
