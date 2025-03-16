import { Elysia } from "elysia";
import { getFilesByFolder, uploadFile } from "../controllers/fileController";

export const fileRoutes = new Elysia()
  .post("/files", uploadFile)
  .get("/folders/:folderId/files", getFilesByFolder);
