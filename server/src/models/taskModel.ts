import { Task } from "../types/task";
import { tasks } from "../data/tasks";

/**
 * Возвращает все задачи из in-memory хранилища.
 *
 * @returns {Task[]} Массив задач
 */
export const getAllTasks = (): Task[] => tasks;

/**
 * Найти задачу по её ID.
 *
 * @param {string} id - Идентификатор задачи
 * @returns {Task | undefined} Найденная задача или undefined
 */
export const getTaskById = (id: string): Task | undefined =>
  tasks.find((task) => task.id === id);

/**
 * Добавить новую задачу в in-memory хранилище.
 *
 * @param {Task} task - Новая задача
 * @returns {Task} Добавленная задача
 */
export const createTask = (task: Task): Task => {
  tasks.push(task);
  return task;
};

/**
 * Обновить существующую задачу по ID.
 *
 * @param {string} id - Идентификатор задачи
 * @param {Partial<Task>} updates - Объект с обновляемыми полями
 * @returns {Task | null} Обновлённая задача или null, если не найдена
 */
export const updateTask = (id: string, updates: Partial<Task>): Task | null => {
  const task = getTaskById(id);
  if (!task) return null;

  Object.assign(task, updates);
  return task;
};

/**
 * Удалить задачу по ID.
 *
 * @param {string} id - Идентификатор задачи
 * @returns {boolean} true, если задача была удалена, иначе false
 */
export const deleteTask = (id: string): boolean => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
};
