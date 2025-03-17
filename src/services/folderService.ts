import { prisma } from "../prisma";
import { FolderRepository } from "../repositories/folderRepository";
import { Folder } from "@prisma/client";
const folderRepository = new FolderRepository();

export interface FolderWithChildren extends Folder {
  children: FolderWithChildren[]; // Struktur rekursif untuk nested children
}

export const folderService = {
  async createFolder(name: string, parentId?: string | null) {
    return folderRepository.createFolder(name, parentId);
  },

  async getSubFolders(parentId: string | null) {
    return folderRepository.getSubFolders(parentId);
  },

  async getSubFoldersRecursive(
    parentId: string | null = null
  ): Promise<FolderWithChildren[]> {
    const folders = await folderRepository.getSubFolders(parentId);

    return Promise.all(
      folders.map(async (folder) => ({
        ...folder,
        children: await folderService.getSubFoldersRecursive(folder.id),
      }))
    );
  },

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
  },
};
