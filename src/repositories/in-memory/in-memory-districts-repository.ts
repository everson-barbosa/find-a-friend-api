import { DistrictsRepository } from '../districts-repository'
import { CreateDistrictDTO, District } from '../../types/Districts'

export class InMemoryDistrictsRepository implements DistrictsRepository {
  public districts: District[] = []

  async create(data: CreateDistrictDTO): Promise<District> {
    const district = { ...data, id: this.districts.length + 1 }

    this.districts.push(district)

    return district
  }

  async findById(id: number) {
    const findedDistrict = this.districts.find((district) => district.id === id)

    return findedDistrict ?? null
  }
}
