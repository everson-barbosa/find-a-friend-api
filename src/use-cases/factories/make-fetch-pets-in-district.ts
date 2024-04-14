import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { FetchPetsInDistrictUseCase } from '../fetch-pets-in-district'

export const makeFetchPetsInDistrictUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()

  const fetchPetsInDistrictUseCase = new FetchPetsInDistrictUseCase(
    petsRepository,
    organizationsRepository,
  )

  return fetchPetsInDistrictUseCase
}
