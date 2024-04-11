import { prisma } from "../../../src/lib/prisma";
import ufs from "./ufs.json";

export const ufsSeedInitialize = async () => {
  console.log("🌱 Seeding ufs...");

  const ufsCount = await prisma.uF.count();

  if (ufsCount > 0) {
    console.log("🛢 Data already seeded!");
  } else {
    await prisma.uF.createMany({
      data: ufs,
    });
  }

  console.log("Done!");
};
