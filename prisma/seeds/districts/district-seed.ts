import { prisma } from "../../../src/lib/prisma";
import districts from "./districts.json";

export const districtsSeedInitialize = async () => {
  console.log("🌱 Seeding districts...");

  const districtsCount = await prisma.district.count();

  if (districtsCount > 0) {
    console.log("🛢 Data already seeded!");
  } else {
    await prisma.district.createMany({
      data: districts,
    });
  }

  console.log("Done!");
};
