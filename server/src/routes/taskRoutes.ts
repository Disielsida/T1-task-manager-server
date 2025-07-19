import { Router } from "express";
import {
  getTasks,
  getTask,
  postTask,
  patchTask,
  removeTask,
} from "../controllers/taskController";

const router = Router();

// Получить все задачи
router.get("/tasks", getTasks);

// Получить задачу по ID
router.get("/tasks/:id", getTask);

// Создать задачу
router.post("/tasks", postTask);

// Обновить задачу
router.patch("/tasks/:id", patchTask);

// Удалить задачу
router.delete("/tasks/:id", removeTask);

export default router;
