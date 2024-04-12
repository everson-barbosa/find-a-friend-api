import { Pet, CreatePetDTO } from "../types/Pet";

export interface PetsRepository {
  create(data: CreatePetDTO): Promise<Pet>;
  findById(id: string): Promise<Pet | null>
}
