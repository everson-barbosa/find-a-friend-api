import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'
import { Pet, CreatePetDTO, PetsFilters } from '../../types/Pet'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: CreatePetDTO): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      ...data,
    }

    this.pets.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    return pet ?? null
  }

  async findManyByOrganizationsId(
    organizationsId: string[],
    filters: PetsFilters = {},
  ): Promise<Pet[]> {
    const filterKeys = Object.keys(filters) as (keyof PetsFilters)[]

    const pets = this.pets.filter((pet) => {
      let doesMatchWithFilters = true

      filterKeys.forEach((filterKey) => {
        if (pet[filterKey] !== filters[filterKey]) {
          doesMatchWithFilters = false
        }
      })

      if (!doesMatchWithFilters) {
        return false
      }

      return organizationsId.includes(pet.org_id)
    })

    return pets ?? []
  }
}
