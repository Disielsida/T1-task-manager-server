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
 * Получает все задачи из хранилища.
 *
 * @route GET /tasks
 * @param {Request} req - HTTP-запрос
 * @param {Response} res - HTTP-ответ
 * @returns {Response} JSON-массив задач
 */
export const getTasks = (req: Request, res: Response) => {
  const tasks = getAllTasks();
  res.json(tasks);
};

/**
 * Получает задачу по ID.
 *
 * @route GET /tasks/:id
 * @param {Request} req - HTTP-запрос (параметр id)
 * @param {Response} res - HTTP-ответ
 * @returns {Response} JSON задачи или 404, если не найдена
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
 * Создаёт новую задачу и добавляет в хранилище.
 *
 * @route POST /tasks
 * @param {Request} req - HTTP-запрос с данными задачи
 * @param {Response} res - HTTP-ответ
 * @returns {Response} JSON созданной задачи со статусом 201
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
 * Обновляет существующую задачу по ID.
 *
 * @route PATCH /tasks/:id
 * @param {Request} req - HTTP-запрос с обновлениями и параметром id
 * @param {Response} res - HTTP-ответ
 * @returns {Response} JSON обновлённой задачи или 404, если не найдена
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
 * Удаляет задачу по ID.
 *
 * @route DELETE /tasks/:id
 * @param {Request} req - HTTP-запрос с параметром id
 * @param {Response} res - HTTP-ответ
 * @returns {Response} 204 при успехе или 404, если задача не найдена
 */
export const removeTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const success = deleteTask(id);

  if (!success) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
};
