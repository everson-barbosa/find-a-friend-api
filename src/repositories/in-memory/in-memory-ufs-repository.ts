import { CreateUFDTO, UF } from "../../types/UFs";
import { UFsRepository } from "../ufs-repository";

export class InMemoryUFsRepository implements UFsRepository {
  public ufs: UF[] = [];

  async create(data: CreateUFDTO): Promise<UF> {
    const uf = { ...data, id: this.ufs.length + 1 };

    this.ufs.push(uf);

    return uf;
  }

  async findById(id: number) {
    const findedUf = this.ufs.find((uf) => uf.id === id);

    return findedUf ?? null;
  }
}
