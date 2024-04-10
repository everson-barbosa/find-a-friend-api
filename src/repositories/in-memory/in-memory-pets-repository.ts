import { randomUUID } from "crypto";
import { PetsRepository } from "../pets-repository";
import { Pet, Prisma } from "@prisma/client";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      ...data,
    };

    this.pets.push(pet);

    return pet;
  }
}
