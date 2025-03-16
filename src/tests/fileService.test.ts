import { describe, it, expect, beforeEach, vi } from "vitest";
import { prismaMock } from "../__mocks__/prisma";
import { FileService } from "../services/fileService";

const fileService = new FileService();

describe("FileService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a file", async () => {
    prismaMock.folder.create.mockResolvedValue({
      id: "folder123",
      name: "Test Folder",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    prismaMock.file.create.mockResolvedValue({
      id: "file123",
      name: "Test File",
      folderId: "folder123",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await prismaMock.folder.create({ data: { name: "Test Folder" } });

    const file = await fileService.createFile("Test File", "folder123");

    expect(file).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      folderId: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should get files by folderId", async () => {
    const mockFiles = [
      {
        id: "file123",
        name: "Test File",
        folderId: "folder123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    prismaMock.file.findMany.mockResolvedValue(mockFiles);

    const files = await fileService.getFilesByFolder("folder123");

    expect(files).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          name: expect.any(String),
          folderId: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    );
  });
});
