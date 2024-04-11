import { CreateOrganizationDTO, Organization } from "../types/Organization";

export interface OrganizationsRepository {
  findById(id: string): Promise<Organization | null>;
  findByEmail(email: string): Promise<Organization | null>;
  create(data: CreateOrganizationDTO): Promise<Organization>;
}
