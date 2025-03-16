import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FileService {
  async createFile(name: string, folderId: string) {
    return await prisma.file.create({
      data: { name, folderId },
    });
  }

  async getFiles(folderId: string) {
    return await prisma.file.findMany({
      where: { folderId },
    });
  }

  async getFilesByFolder(folderId: string) {
    return await prisma.file.findMany({
      where: { folderId },
    });
  }
}
