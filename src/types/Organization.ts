export interface Organization {
  id: string;
  accountable_name: string;
  email: string;
  postal_code: string;
  whatsapp: string;
  password_hash: string;
  district_id: number;
}

export type CreateOrganizationDTO = Omit<Organization, "id">;
