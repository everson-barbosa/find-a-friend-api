import { District } from "./Districts";

export interface UF {
  id: number;
  name: string;
  districts: District[];
}

export type CreateUFDTO = Omit<UF, "id">;
