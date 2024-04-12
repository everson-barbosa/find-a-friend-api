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

  async findById(id: string): Promise<Pet | null> {
      const pet = this.pets.find(pet => pet.id === id)

      return pet ?? null
  }
}
