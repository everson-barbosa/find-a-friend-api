import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";
import { randomUUID } from "crypto";

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  organizations: Organization[] = [];

  async findUnique(id: string) {
    const organization = this.organizations.find(
      (organization) => organization.id === id
    );

    return organization ?? null;
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = {
      ...data,
      id: randomUUID(),
    };

    this.organizations.push(organization);

    return organization;
  }
}
