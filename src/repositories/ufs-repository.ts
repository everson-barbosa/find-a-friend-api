import { CreateUFDTO, UF } from "../types/UFs";

export interface UFsRepository {
  create(data: CreateUFDTO): Promise<UF>;
  findById(id: number): Promise<UF | null>;
}
