/*
  Warnings:

  - You are about to drop the column `orgId` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `about` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy_level` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environment` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level_of_independence` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo_url` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "energy_level" TEXT NOT NULL,
    "level_of_independence" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    CONSTRAINT "Pet_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Organization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("id") SELECT "id" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
