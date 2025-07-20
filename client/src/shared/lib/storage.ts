import type { Task } from "@shared/types/task";

const TASKS_STORAGE_KEY = "task-manager-tasks";

/**
 * Загружает список задач из localStorage.
 * @returns Массив задач или пустой массив при ошибке или отсутствии данных.
 */
export const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(TASKS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load tasks from localStorage", error);
    return [];
  }
};

/**
 * Сохраняет список задач в localStorage.
 * @param tasks - Массив задач, который нужно сохранить.
 */
export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage", error);
  }
};
