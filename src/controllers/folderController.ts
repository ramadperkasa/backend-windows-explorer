import { folderService, FolderWithChildren } from "../services/folderService";
import { formatResponse } from "../utils/response";

export const createFolder = async ({
  body,
}: {
  body: { name: string; parentId?: string | null };
}) => {
  if (!body.name) {
    return new Response(JSON.stringify({ error: "Name is required" }), {
      status: 400,
    });
  }

  const folder = await folderService.createFolder(body.name, body.parentId);

  return formatResponse(201, "Folder created successfully", folder);
};

export const getFolders = async ({
  query,
}: {
  query: { parentId?: string };
}) => {
  const folders: FolderWithChildren[] =
    await folderService.getSubFoldersRecursive(query.parentId ?? null);

  return formatResponse(200, "Folders fetched successfully", folders);
};

export const deleteFolder = async ({ params }: { params: { id: string } }) => {
  try {
    await folderService.deleteFolder(params.id);
    return formatResponse(200, "Folder deleted successfully");
  } catch (error) {
    return formatResponse(500, "Failed to delete folder");
  }
};
