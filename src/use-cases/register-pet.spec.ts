import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { RegisterPetUseCase } from "./register-pet";
import { PetsRepository } from "../repositories/pets-repository";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { OrganizationNotFoundError } from "./errors/organization-not-found";

describe("Use cases: Create pet", () => {
  let petsRepository: PetsRepository;
  let organizationsRepository: OrganizationsRepository;
  let sut: RegisterPetUseCase;

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new RegisterPetUseCase(petsRepository, organizationsRepository);
  });

  it("should be able register a pet", async () => {
    const { id: orgId } = await organizationsRepository.create({
      accountable_name: "Everson",
      city: "São Paulo",
      email: "everson@gmail.com",
      postal_code: "12345123",
      whatsapp: "11999999999",
      password_hash: "SomePassword123",
    });

    const { pet } = await sut.execute({
      name: "Doggy",
      about: "My little doggy",
      age_id: "1",
      size_id: "1",
      energy_level_id: "1",
      environment_id: "1",
      level_of_independence_id: "1",
      org_id: orgId,
      requirements: "Requirements",
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able register a pet without organization", async () => {
    await expect(() =>
      sut.execute({
        name: "Doggy",
        about: "My little doggy",
        age_id: "1",
        size_id: "1",
        energy_level_id: "1",
        environment_id: "1",
        level_of_independence_id: "1",
        org_id: "not-existent-id",
        requirements: "Requirements",
      })
    ).rejects.toBeInstanceOf(OrganizationNotFoundError);
  });
});
