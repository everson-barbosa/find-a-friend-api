import { prisma } from "../../lib/prisma";
import { CreatePetDTO, Pet, PetsFilters } from "../../types/Pet";
import { PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {

    async create(data: CreatePetDTO): Promise<Pet> {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }

    async findById(id: string): Promise<Pet | null> {
        const pet = await prisma.pet.findUnique({
            where: {
                id
            }
        })

        return pet
    }

    async findManyByOrganizationsId(organizationsId: string[], filters: PetsFilters = {}): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                org_id: {
                    in: organizationsId
                },
                ...filters
            }
        })

        return pets
    }
}