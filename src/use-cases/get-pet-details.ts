import { PetsRepository } from '../repositories/pets-repository'
import { Pet } from '../types/Pet'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetPetDetailsUseCaseRequest extends Pick<Pet, 'id'> {}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
