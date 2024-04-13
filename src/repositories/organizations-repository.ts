import { CreateOrganizationDTO, Organization } from "../types/Organization";

export interface OrganizationsRepository {
  findById(id: string): Promise<Organization | null>;
  findByEmail(email: string): Promise<Organization | null>;
  findManyByDistrictId(districtId: number): Promise<Organization[]>;
  create(data: CreateOrganizationDTO): Promise<Organization>;
}
