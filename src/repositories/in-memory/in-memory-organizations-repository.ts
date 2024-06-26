import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'crypto'
import { CreateOrganizationDTO, Organization } from '../../types/Organization'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  organizations: Organization[] = []

  async findById(id: string) {
    const organization = this.organizations.find(
      (organization) => organization.id === id,
    )

    return organization ?? null
  }

  async findByEmail(email: string) {
    const organization = this.organizations.find(
      (organization) => organization.email === email,
    )

    return organization ?? null
  }

  async findManyByDistrictId(districtId: number): Promise<Organization[]> {
    const organizations = await this.organizations.filter(
      (organization) => organization.district_id === districtId,
    )

    return organizations
  }

  async create(data: CreateOrganizationDTO): Promise<Organization> {
    const organization = {
      ...data,
      id: randomUUID(),
    }

    this.organizations.push(organization)

    return organization
  }
}
