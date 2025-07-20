import express from "express";
import cors from "cors";
import path from "path";
import taskRoutes from "./routes/taskRoutes";
import { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Позволяет принимать JSON-запросы
app.use(express.json());

// Разрешаем запросы с фронтенда на http://localhost:5173 (во время разработки)
app.use(cors({ origin: "http://localhost:5173" }));

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
