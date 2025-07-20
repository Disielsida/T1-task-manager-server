import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

/**
 * Массив задач, используемый как временное in-memory хранилище.
 *
 * Эти задачи инициализируются при запуске сервера и используются
 * для демонстрации API без подключения базы данных.
 *
 * Каждая задача включает:
 * - уникальный ID (генерируется с помощью uuid)
 * - заголовок и описание
 * - категорию, статус, приоритет
 * - дату создания (ISO-строка)
 */
export const tasks: Task[] = [
  {
    id: uuidv4(),
    title: "Fix login bug",
    description: "Login fails when password contains special characters.",
    category: "Bug",
    status: "To Do",
    priority: "High",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Implement dark mode",
    description: "Add a theme switch for dark mode to increase user loyalty and user experience.",
    category: "Feature",
    status: "In Progress",
    priority: "Medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Update README",
    description: "Add instructions for use that won't bother and gather dust on the shelf.",
    category: "Documentation",
    status: "Done",
    priority: "Low",
    createdAt: new Date().toISOString(),
  },
];
