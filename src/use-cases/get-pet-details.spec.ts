import { beforeEach, describe, expect, it } from "vitest";
import { PetsRepository } from "../repositories/pets-repository";
import { GetPetDetailsUseCase } from "./get-pet-details";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

describe('Use cases: Get pet details', () => {
    let petsRepository: PetsRepository
    let sut: GetPetDetailsUseCase

    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        sut = new GetPetDetailsUseCase(petsRepository)
    })

    it('should be able to get pet details', async () => {
        const createdPet = await petsRepository.create({
            name: 'Pet name',
            about: 'About text',
            age_id: '1',
            energy_level_id: '1',
            environment_id: '1',
            level_of_independence_id: '1',
            size_id: '1',
            org_id: '1',
            photo_url: null,
            requirements: 'Requiments',
        })

        const { pet } = await sut.execute({ id: createdPet.id })

        expect(pet).toMatchObject({
            id: pet.id,
            name: 'Pet name',
            about: 'About text',
            age_id: '1',
            energy_level_id: '1',
            environment_id: '1',
            level_of_independence_id: '1',
            size_id: '1',
            org_id: '1',
            photo_url: null,
            requirements: 'Requiments',
        })
    })

    it('should be able to get pet details', async () => {
        const createdPet = await petsRepository.create({
            name: 'Pet name',
            about: 'About text',
            age_id: '1',
            energy_level_id: '1',
            environment_id: '1',
            level_of_independence_id: '1',
            size_id: '1',
            org_id: '1',
            photo_url: null,
            requirements: 'Requiments',
        })

        await expect(() => sut.execute({ id: 'wrong-id' })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})