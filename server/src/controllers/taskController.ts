import { Request, Response } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../models/taskModel";
import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

/**
 * Получить все задачи.
 */
export const getTasks = (req: Request, res: Response) => {
  const tasks = getAllTasks();
  res.json(tasks);
};

/**
 * Получить задачу по ID.
 */
export const getTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const task = getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
};

/**
 * Создать новую задачу.
 */
export const postTask = (req: Request, res: Response) => {
  const data = req.body;

  const newTask: Task = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  createTask(newTask);
  res.status(201).json(newTask);
};

/**
 * Обновить задачу.
 */
export const patchTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = updateTask(id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(updated);
};

/**
 * Удалить задачу.
 */
export const removeTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const success = deleteTask(id);

  if (!success) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
};
