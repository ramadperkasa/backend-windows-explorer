import { Elysia } from "elysia";
import { folderRoutes } from "./routes/folderRoute";
import { fileRoutes } from "./routes/fileRoute";

const app = new Elysia()
  .use(folderRoutes)
  .use(fileRoutes)
  .get("/", () => "Server is running 🚀")
  .listen(3000);

console.log("🚀 Server running at http://localhost:3000");
