/*
  Warnings:

  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Organization";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pet";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "pet_ages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pet_sizes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pet_energy_levels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pet_levels_of_independence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pet_environments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pets" (
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

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountable_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL
);
