import { randomUUID } from "crypto";
import { PetsRepository } from "../pets-repository";
import { Pet, CreatePetDTO } from "../../types/Pet";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  async create(data: CreatePetDTO): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      ...data,
    };

    this.pets.push(pet);

    return pet;
  }
}
