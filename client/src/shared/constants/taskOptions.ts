import type { TaskCategory, TaskStatus, TaskPriority } from "../types/task";

/**
 * Список опций для выбора категории задачи.
 * Используется в формах создания и редактирования задач.
 */
export const categoryOptions = [
  { id: "Bug", label: "Bug" },
  { id: "Feature", label: "Feature" },
  { id: "Documentation", label: "Documentation" },
  { id: "Refactor", label: "Refactor" },
  { id: "Test", label: "Test" },
] satisfies { id: TaskCategory; label: string }[];

/**
 * Список опций для выбора статуса задачи.
 */
export const statusOptions = [
  { id: "To Do", label: "To Do" },
  { id: "In Progress", label: "In Progress" },
  { id: "Done", label: "Done" },
] satisfies { id: TaskStatus; label: string }[];

/**
 * Список опций для выбора приоритета задачи.
 */
export const priorityOptions = [
  { id: "Low", label: "Low" },
  { id: "Medium", label: "Medium" },
  { id: "High", label: "High" },
] satisfies { id: TaskPriority; label: string }[];
