/*
  Warnings:

  - Made the column `age_id` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `energy_level_id` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `environment_id` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level_of_independence_id` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size_id` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,
    "energy_level_id" TEXT NOT NULL,
    "level_of_independence_id" TEXT NOT NULL,
    "environment_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "photo_url" TEXT,
    "requirements" TEXT,
    CONSTRAINT "pets_age_id_fkey" FOREIGN KEY ("age_id") REFERENCES "pet_ages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pets_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "pet_sizes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pets_energy_level_id_fkey" FOREIGN KEY ("energy_level_id") REFERENCES "pet_energy_levels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pets_level_of_independence_id_fkey" FOREIGN KEY ("level_of_independence_id") REFERENCES "pet_levels_of_independence" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pets_environment_id_fkey" FOREIGN KEY ("environment_id") REFERENCES "pet_environments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pets" ("about", "age_id", "energy_level_id", "environment_id", "id", "level_of_independence_id", "name", "org_id", "photo_url", "requirements", "size_id") SELECT "about", "age_id", "energy_level_id", "environment_id", "id", "level_of_independence_id", "name", "org_id", "photo_url", "requirements", "size_id" FROM "pets";
DROP TABLE "pets";
ALTER TABLE "new_pets" RENAME TO "pets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
