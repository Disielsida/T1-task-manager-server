import express from "express";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Встроенный middleware для JSON
app.use(express.json());

// Роуты для задач
app.use("/api", taskRoutes);

// Старт сервера
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
