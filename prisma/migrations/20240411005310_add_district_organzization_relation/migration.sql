/*
  Warnings:

  - You are about to drop the column `city` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `district_id` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_organizations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountable_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "district_id" INTEGER NOT NULL,
    CONSTRAINT "organizations_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "districts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_organizations" ("accountable_name", "email", "id", "password_hash", "postal_code", "whatsapp") SELECT "accountable_name", "email", "id", "password_hash", "postal_code", "whatsapp" FROM "organizations";
DROP TABLE "organizations";
ALTER TABLE "new_organizations" RENAME TO "organizations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
