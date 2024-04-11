import { districtsSeedInitialize } from "./seeds/districts/district-seed";
import { ufsSeedInitialize } from "./seeds/ufs/ufs-seed";

export const seedDatabase = async () => {
  await ufsSeedInitialize();

  await districtsSeedInitialize();
};

seedDatabase();
