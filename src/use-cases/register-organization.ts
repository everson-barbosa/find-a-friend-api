import { DistrictsRepository } from '../repositories/districts-repository'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { Organization, CreateOrganizationDTO } from '../types/Organization'
import { DistrictNotFoundError } from './errors/district-not-found'
import { OrganizationEmailAlreadyExistsError } from './errors/organization-email-already-exists'
import { hash } from 'bcryptjs'

interface RegisterOrganizationUseCaseRequest
  extends Omit<CreateOrganizationDTO, 'password_hash'> {
  password: string
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private districtsRepository: DistrictsRepository,
  ) {}

  async execute({
    accountable_name,
    district_id,
    email,
    password,
    postal_code,
    whatsapp,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const organizationWithEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithEmail) {
      throw new OrganizationEmailAlreadyExistsError()
    }

    const district = await this.districtsRepository.findById(district_id)

    if (!district) {
      throw new DistrictNotFoundError()
    }

    const organization = await this.organizationsRepository.create({
      accountable_name,
      district_id,
      email,
      password_hash: await hash(password, 6),
      postal_code,
      whatsapp,
    })

    return { organization }
  }
}
