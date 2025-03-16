import { prisma } from "../prisma";
import { FolderRepository } from "../repositories/folderRepository";

const folderRepository = new FolderRepository();

export class FolderService {
  async createFolder(name: string, parentId?: string | null) {
    return folderRepository.createFolder(name, parentId);
  }

  async getSubFolders(parentId: string | null) {
    return folderRepository.getSubFolders(parentId);
  }

  async deleteFolder(id: string) {
    return await prisma.$transaction(async (tx) => {
      await tx.file.deleteMany({
        where: { folderId: id },
      });

      const subfolders = await tx.folder.findMany({
        where: { parentId: id },
      });

      for (const subfolder of subfolders) {
        await this.deleteFolder(subfolder.id);
      }

      return await tx.folder.delete({
        where: { id },
      });
    });
  }
}
