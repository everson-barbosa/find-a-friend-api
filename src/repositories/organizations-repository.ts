import { Organization, Prisma } from "@prisma/client";

export interface OrganizationsRepository {
  findUnique(id: string): Promise<Organization | null>;
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
}
