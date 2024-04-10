import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../repositories/pets-repository";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { OrganizationNotFoundError } from "./errors/organization-not-found";

interface RegisterPetUseCaseRequest extends Prisma.PetUncheckedCreateInput {}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository
  ) {}

  async execute(
    data: RegisterPetUseCaseRequest
  ): Promise<RegisterPetUseCaseResponse> {
    const organization = await this.organizationsRepository.findUnique(
      data.org_id
    );

    if (!organization) {
      throw new OrganizationNotFoundError();
    }

    const pet = await this.petsRepository.create(data);

    return { pet };
  }
}
