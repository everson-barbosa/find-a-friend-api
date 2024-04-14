import { CreateDistrictDTO, District } from '../types/Districts'

export interface DistrictsRepository {
  create(data: CreateDistrictDTO): Promise<District>
  findById(id: number): Promise<District | null>
}
