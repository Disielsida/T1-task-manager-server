import { Task } from "../types/task";
import { tasks } from "../data/tasks";

/**
 * Возвращает все задачи.
 */
export const getAllTasks = () => tasks;

/**
 * Возвращает задачу по ID.
 */
export const getTaskById = (id: string) => tasks.find((task) => task.id === id);

/**
 * Добавляет новую задачу.
 */
export const createTask = (task: Task) => {
  tasks.push(task);
  return task;
};

/**
 * Обновляет существующую задачу по ID.
 */
export const updateTask = (id: string, updates: Partial<Task>) => {
  const task = getTaskById(id);
  if (!task) return null;

  Object.assign(task, updates);
  return task;
};

/**
 * Удаляет задачу по ID.
 */
export const deleteTask = (id: string) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
};
