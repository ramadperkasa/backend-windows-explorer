import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FolderRepository {
  async createFolder(name: string, parentId?: string | null) {
    return prisma.folder.create({
      data: {
        name,
        parentId: parentId || null,
      },
    });
  }

  async getFolderById(id: string) {
    return prisma.folder.findUnique({ where: { id } });
  }

  async getSubFolders(parentId: string | null = null) {
    return prisma.folder.findMany({ where: { parentId } });
  }

  async deleteFolder(id: string) {
    return prisma.folder.delete({ where: { id } });
  }
}
