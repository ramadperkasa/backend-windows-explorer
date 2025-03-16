import { FileService } from "../services/fileService";

const fileService = new FileService();

export const uploadFile = async ({
  body,
}: {
  body: { name: string; folderId: string };
}) => {
  if (!body.name || !body.folderId) {
    return new Response(JSON.stringify({ error: "Missing name or folderId" }), {
      status: 400,
    });
  }

  try {
    const file = await fileService.createFile(body.name, body.folderId);
    return new Response(JSON.stringify(file), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to upload file" }), {
      status: 500,
    });
  }
};

export const getFilesByFolder = async ({
  params,
}: {
  params: { folderId: string };
}) => {
  if (!params.folderId) {
    return new Response(JSON.stringify({ error: "Folder ID is required" }), {
      status: 400,
    });
  }

  try {
    const files = await fileService.getFilesByFolder(params.folderId);
    return new Response(JSON.stringify(files), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch files" }), {
      status: 500,
    });
  }
};
