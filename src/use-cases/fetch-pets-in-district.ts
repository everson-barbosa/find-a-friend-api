import { OrganizationsRepository } from "../repositories/organizations-repository";
import { PetsRepository } from "../repositories/pets-repository";
import { Pet, PetsFilters } from "../types/Pet";

interface FetchPetsInDistrictUseCaseRequest {
    districtId: number
    filters?: PetsFilters
}

interface FetchPetsInDistrictUseCaseResponse {
    pets: Pet[]
}

export class FetchPetsInDistrictUseCase {
    constructor (private petsRepository: PetsRepository, private organizationsRepository: OrganizationsRepository) {}

    async execute({ districtId, filters = {} }: FetchPetsInDistrictUseCaseRequest): Promise<FetchPetsInDistrictUseCaseResponse> {
        const organizations = await this.organizationsRepository.findManyByDistrictId(districtId)

        const organizationsId = organizations.map(({id}) => id)

        const pets = await this.petsRepository.findManyByOrganizationsId(organizationsId, filters)

        return { pets }
    }
}