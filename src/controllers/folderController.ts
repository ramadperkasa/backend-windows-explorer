import { FolderService } from "../services/folderService";

const folderService = new FolderService();

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
  return new Response(JSON.stringify(folder), { status: 201 });
};

export const getFolders = async ({
  query,
}: {
  query: { parentId?: string };
}) => {
  const folders = await folderService.getSubFolders(query.parentId ?? null);
  return new Response(JSON.stringify(folders), { status: 200 });
};

export const deleteFolder = async ({ params }: { params: { id: string } }) => {
  try {
    await folderService.deleteFolder(params.id);
    return new Response(
      JSON.stringify({ message: "Folder deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete folder" }), {
      status: 500,
    });
  }
};
