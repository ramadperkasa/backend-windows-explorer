import { vi } from "vitest";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const prismaMock = {
  file: {
    create: vi.fn(),
    findMany: vi.fn(),
  },
  folder: {
    create: vi.fn(),
    findMany: vi.fn(),
  },
};
