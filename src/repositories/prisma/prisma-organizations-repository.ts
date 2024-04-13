import { prisma } from "../../lib/prisma";
import { CreateOrganizationDTO, Organization } from "../../types/Organization";
import { OrganizationsRepository } from "../organizations-repository";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
    async create(data: CreateOrganizationDTO): Promise<Organization> {
        const organization = await prisma.organization.create({
            data
        })

        return organization
    }

    async findByEmail(email: string): Promise<Organization | null> {
        const organization = await prisma.organization.findUnique({
            where: {
                email
            }
        })

        return organization
    }

    async findById(id: string): Promise<Organization | null> {
        const organization = await prisma.organization.findUnique({
            where: {
                id
            }
        })

        return organization
    }

    async findManyByDistrictId(districtId: number): Promise<Organization[]> {
        const organizations = await prisma.organization.findMany({
            where: {
                district_id: districtId
            }
        })

        return organizations ?? [] 
    }
}