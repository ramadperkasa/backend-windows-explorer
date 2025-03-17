import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { folderRoutes } from "./routes/folderRoute";
import { fileRoutes } from "./routes/fileRoute";
import { formatResponse } from "./utils/response";

const app = new Elysia();

app.onError((context) => {
  const { error } = context;
  return formatResponse(500, "Something went wrong", {
    code: 500,
    message: "message" in error ? error.message : "Unknown error",
  });
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.group("/api/v1", (api) => {
  api.use(folderRoutes);
  api.use(fileRoutes);

  return api;
});

app.get("/", () => "Server is running 🚀");

app.listen(3000);

console.log("🚀 Server running at http://localhost:3000");
