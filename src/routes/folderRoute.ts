import { Elysia } from "elysia";
import {
  createFolder,
  deleteFolder,
  getFolders,
} from "../controllers/folderController";

export const folderRoutes = new Elysia()
  .post("/folders", createFolder)
  .get("/folders", getFolders)
  .delete("/folders/:id", deleteFolder);
