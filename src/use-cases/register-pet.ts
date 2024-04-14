import { PetsRepository } from '../repositories/pets-repository'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { OrganizationNotFoundError } from './errors/organization-not-found'
import { CreatePetDTO, Pet } from '../types/Pet'

interface RegisterPetUseCaseRequest extends CreatePetDTO {}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute(
    data: RegisterPetUseCaseRequest,
  ): Promise<RegisterPetUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      data.org_id,
    )

    if (!organization) {
      throw new OrganizationNotFoundError()
    }

    const pet = await this.petsRepository.create(data)

    return { pet }
  }
}
