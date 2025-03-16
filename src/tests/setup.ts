import { vi } from "vitest";

vi.mock("../lib/prisma", () => ({
  prisma: {
    file: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));
