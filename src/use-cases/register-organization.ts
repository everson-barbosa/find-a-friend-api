import { DistrictsRepository } from "../repositories/districts-repository";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { UFsRepository } from "../repositories/ufs-repository";
import { Organization, CreateOrganizationDTO } from "../types/Organization";
import { DistrictNotFoundError } from "./errors/district-not-found";
import { OrganizationEmailAlreadyExistsError } from "./errors/organization-email-already-exists";

interface RegisterOrganizationUseCaseRequest extends CreateOrganizationDTO {}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization;
}

export class RegisterOrganizationUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private districtsRepository: DistrictsRepository
  ) {}

  async execute(
    data: RegisterOrganizationUseCaseRequest
  ): Promise<RegisterOrganizationUseCaseResponse> {
    const organizationWithEmail =
      await this.organizationsRepository.findByEmail(data.email);

    if (organizationWithEmail) {
      throw new OrganizationEmailAlreadyExistsError();
    }

    const district = await this.districtsRepository.findById(data.district_id);

    if (!district) {
      throw new DistrictNotFoundError();
    }

    const organization = await this.organizationsRepository.create(data);

    return { organization };
  }
}
