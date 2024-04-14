import { beforeEach, describe, expect, it } from 'vitest'
import { PetsRepository } from '../repositories/pets-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { FetchPetsInDistrictUseCase } from './fetch-pets-in-district'
import { Organization } from '../types/Organization'

describe('Use cases: Fetch pets in district', () => {
  let petsRepository: PetsRepository
  let organizationsRepository: OrganizationsRepository
  let sut: FetchPetsInDistrictUseCase
  let organization: Organization

  const createOrganizationPlaceholder = {
    postal_code: '12345123',
    whatsapp: '11999999999',
    password_hash: 'SomePassword123',
  }

  const createPetPlaceholder = {
    about: 'About description',
    age_id: '1',
    size_id: '1',
    energy_level_id: '1',
    environment_id: '1',
    level_of_independence_id: '1',
    photo_url: null,
    requirements: 'Requirements',
  }

  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new FetchPetsInDistrictUseCase(
      petsRepository,
      organizationsRepository,
    )

    organization = await organizationsRepository.create({
      accountable_name: 'Everson',
      district_id: 1,
      email: 'everson@gmail.com',
      ...createOrganizationPlaceholder,
    })
  })

  it('should be able to fetch pets by district', async () => {
    const organizationInAnotherDistrict = await organizationsRepository.create({
      accountable_name: 'Barbosa',
      district_id: 2,
      email: 'barbosa@gmail.com',
      ...createOrganizationPlaceholder,
    })

    await Promise.all([
      petsRepository.create({
        name: 'Doggy In District',
        org_id: organization.id,
        ...createPetPlaceholder,
      }),
      petsRepository.create({
        name: 'Cat In District',
        org_id: organization.id,
        ...createPetPlaceholder,
      }),
      petsRepository.create({
        name: 'Doggy Out District',
        org_id: organizationInAnotherDistrict.id,
        ...createPetPlaceholder,
      }),
    ])

    const { pets } = await sut.execute({
      districtId: organization.district_id,
    })

    expect(pets).toHaveLength(2)
    expect(pets).not.toEqual([
      expect.objectContaining({
        name: 'Doggy Out District',
      }),
    ])
  })

  it('should be able to filter pets by age', async () => {
    await Promise.all([
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Doggy In Age',
        org_id: organization.id,
        age_id: '1',
      }),
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Cat In Age',
        org_id: organization.id,
        age_id: '1',
      }),
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Doggy Out Age',
        org_id: organization.id,
        age_id: '2',
      }),
    ])

    const { pets } = await sut.execute({
      districtId: organization.district_id,
      filters: {
        age_id: '1',
      },
    })

    expect(pets).toHaveLength(2)
    expect(pets).not.toEqual([
      expect.objectContaining({
        name: 'Doggy Out Age',
      }),
    ])
  })

  it('should be able to filter pets by energy level', async () => {
    await Promise.all([
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Doggy In Energy Level',
        org_id: organization.id,
        energy_level_id: '1',
      }),
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Cat In Energy Level',
        org_id: organization.id,
        energy_level_id: '1',
      }),
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Doggy Out Energy Level',
        org_id: organization.id,
        energy_level_id: '2',
      }),
    ])

    const { pets } = await sut.execute({
      districtId: organization.district_id,
      filters: {
        energy_level_id: '1',
      },
    })

    expect(pets).toHaveLength(2)
    expect(pets).not.toEqual([
      expect.objectContaining({
        name: 'Doggy Out Energy Level',
      }),
    ])
  })

  it('should be able to filter pets by environment', async () => {
    await Promise.all([
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Doggy In Environment',
        org_id: organization.id,
        environment_id: '1',
      }),
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Cat In Environment',
        org_id: organization.id,
        environment_id: '1',
      }),
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Doggy Out Environment',
        org_id: organization.id,
        environment_id: '2',
      }),
    ])

    const { pets } = await sut.execute({
      districtId: organization.district_id,
      filters: {
        environment_id: '1',
      },
    })

    expect(pets).toHaveLength(2)
    expect(pets).not.toEqual([
      expect.objectContaining({
        name: 'Doggy Out Environment',
      }),
    ])
  })

  it('should be able to filter pets by level of independence', async () => {
    const organization = await organizationsRepository.create({
      accountable_name: 'Everson',
      district_id: 1,
      email: 'everson@gmail.com',
      ...createOrganizationPlaceholder,
    })

    await Promise.all([
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Doggy In Level of Independence',
        org_id: organization.id,
        level_of_independence_id: '1',
      }),
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Cat In Level of Independence',
        org_id: organization.id,
        level_of_independence_id: '1',
      }),
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Doggy Out Level of Independence',
        org_id: organization.id,
        level_of_independence_id: '2',
      }),
    ])

    const { pets } = await sut.execute({
      districtId: organization.district_id,
      filters: {
        level_of_independence_id: '1',
      },
    })

    expect(pets).toHaveLength(2)
    expect(pets).not.toEqual([
      expect.objectContaining({
        name: 'Doggy Out Level of Independence',
      }),
    ])
  })

  it('should be able to filter pets by size', async () => {
    await Promise.all([
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Doggy In Size',
        org_id: organization.id,
        size_id: '1',
      }),
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Cat In Size',
        org_id: organization.id,
        size_id: '1',
      }),
      petsRepository.create({
        ...createPetPlaceholder,
        name: 'Doggy Out Size',
        org_id: organization.id,
        size_id: '2',
      }),
    ])

    const { pets } = await sut.execute({
      districtId: organization.district_id,
      filters: {
        size_id: '1',
      },
    })

    expect(pets).toHaveLength(2)
    expect(pets).not.toEqual([
      expect.objectContaining({
        name: 'Doggy Out Size',
      }),
    ])
  })
})
