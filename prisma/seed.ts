import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting seeding...");

  try {
    console.log("....");
    const dbStatus = await prisma.$queryRaw`SELECT 1;`;
    console.log("✅ Database connected:", dbStatus);
  } catch (error) {
    console.log("..");
    console.error("❌ Error connecting to database:", error);
  } finally {
    console.log(".");
    await prisma.$disconnect();
    console.log("🔌 Database connection closed.");
  }
}

main();
