import { beforeEach, describe, expect, it } from "vitest";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { RegisterOrganizationUseCase } from "./register-organization";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { OrganizationEmailAlreadyExistsError } from "./errors/organization-email-already-exists";
import { DistrictsRepository } from "../repositories/districts-repository";
import { InMemoryDistrictsRepository } from "../repositories/in-memory/in-memory-districts-repository";
import { DistrictNotFoundError } from "./errors/district-not-found";

describe("Use cases: Register organization", () => {
  let organizationsRepository: OrganizationsRepository;
  let districtsRepository: DistrictsRepository;
  let sut: RegisterOrganizationUseCase;

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    districtsRepository = new InMemoryDistrictsRepository();
    sut = new RegisterOrganizationUseCase(
      organizationsRepository,
      districtsRepository
    );
  });

  it("should be able to register a organization", async () => {
    await districtsRepository.create({
      name: "São Paulo",
      id: 1,
      uf_id: 10,
    });

    const { organization } = await sut.execute({
      accountable_name: "Everson",
      district_id: 1,
      email: "everson@gmail.com",
      postal_code: "12345123",
      whatsapp: "11999999999",
      password_hash: "SomePassword123",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("it should not be able to register an organization with an email that already exists", async () => {
    await districtsRepository.create({
      name: "São Paulo",
      id: 1,
      uf_id: 10,
    });

    await sut.execute({
      accountable_name: "Everson",
      district_id: 1,
      email: "everson@gmail.com",
      postal_code: "12345123",
      whatsapp: "11999999999",
      password_hash: "SomePassword123",
    });

    await expect(() =>
      sut.execute({
        accountable_name: "Everson",
        district_id: 1,
        email: "everson@gmail.com",
        postal_code: "12345123",
        whatsapp: "11999999999",
        password_hash: "SomePassword123",
      })
    ).rejects.toBeInstanceOf(OrganizationEmailAlreadyExistsError);
  });

  it("it should not be able to register an organization with an inexistent district", async () => {
    await expect(() =>
      sut.execute({
        accountable_name: "Everson",
        district_id: 1,
        email: "everson@gmail.com",
        postal_code: "12345123",
        whatsapp: "11999999999",
        password_hash: "SomePassword123",
      })
    ).rejects.toBeInstanceOf(DistrictNotFoundError);
  });
});
