import { Pet, CreatePetDTO, PetsFilters } from "../types/Pet";

export interface PetsRepository {
  create(data: CreatePetDTO): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByOrganizationsId(organizationsId: string[], filters?: PetsFilters): Promise<Pet[]>
}
