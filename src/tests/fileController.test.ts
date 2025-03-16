import { describe, it, expect, vi } from "vitest";
import { getFilesByFolder } from "../controllers/fileController";
import { prismaMock } from "../__mocks__/prisma";

describe("FileController", () => {
  it("should return files in a folder", async () => {
    prismaMock.file.findMany.mockResolvedValue([
      {
        id: "file123",
        name: "Test File",
        folderId: "folder123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const response = await getFilesByFolder({
      params: { folderId: "folder123" },
    });

    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          name: expect.any(String),
          folderId: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ])
    );
  });

  it("should return error when folderId is missing", async () => {
    const response = await getFilesByFolder({ params: { folderId: "" } });
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result).toEqual({ error: "Folder ID is required" });
  });
});
