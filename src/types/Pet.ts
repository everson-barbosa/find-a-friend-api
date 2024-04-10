export interface Pet {
  id: string;
  name: string;
  about: string;
  age_id: string;
  size_id: string;
  energy_level_id: string;
  level_of_independence_id: string;
  environment_id: string;
  org_id: string;
  photo_url: string | null;
  requirements: string | null;
}

export type CreatePetDTO = Omit<Pet, "id">;
