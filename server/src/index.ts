import express from "express";
import cors from "cors";
import path from "path";
import taskRoutes from "./routes/taskRoutes";
import { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешённые источники (origin) для CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://t1-task-manager-server.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Позволяет принимать JSON-запросы
app.use(express.json());

// Подключение маршрутов API
app.use("/api", taskRoutes);

// Путь к клиентской сборке (будет использоваться в проде)
const clientPath = path.join(__dirname, "../../client/dist");
app.use(express.static(clientPath));

// Отдаём index.html на все остальные маршруты (SPA fallback)
app.get("/*", (_req: Request, res: Response) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
