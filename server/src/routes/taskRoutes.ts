import { Router } from "express";
import {
  getTasks,
  getTask,
  postTask,
  patchTask,
  removeTask,
} from "../controllers/taskController";

const router = Router();

/**
 * @route GET /tasks
 * @description Получить список всех задач
 */
router.get("/tasks", getTasks);

/**
 * @route GET /tasks/:id
 * @description Получить задачу по ID
 */
router.get("/tasks/:id", getTask);

/**
 * @route POST /tasks
 * @description Создать новую задачу
 */
router.post("/tasks", postTask);

/**
 * @route PATCH /tasks/:id
 * @description Обновить задачу по ID
 */
router.patch("/tasks/:id", patchTask);

/**
 * @route DELETE /tasks/:id
 * @description Удалить задачу по ID
 */
router.delete("/tasks/:id", removeTask);

export default router;
