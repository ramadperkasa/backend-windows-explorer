import { FileService } from "../services/fileService";
import { formatResponse } from "../utils/response";

const fileService = new FileService();

export const uploadFile = async ({
  body,
}: {
  body: { name: string; folderId: string };
}) => {
  if (!body.name || !body.folderId) {
    return formatResponse(400, "Missing name or folderId");
  }

  try {
    const file = await fileService.createFile(body.name, body.folderId);

    return formatResponse(201, "File uploaded successfully", file);
  } catch (error) {
    return formatResponse(500, "Failed to upload file");
  }
};

export const getFilesByFolder = async ({
  params,
}: {
  params: { folderId: string };
}) => {
  if (!params.folderId) {
    return formatResponse(400, "Folder ID is required");
  }
  try {
    const files = await fileService.getFilesByFolder(params.folderId);
    return formatResponse(200, "Files fetched successfully", files);
  } catch (error) {
    return formatResponse(500, "Failed to fetch files");
  }
};
