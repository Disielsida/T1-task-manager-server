/**
 * Категория задачи.
 * Определяет тип работы, которую представляет задача.
 */
export type TaskCategory =
  | "Bug"
  | "Feature"
  | "Documentation"
  | "Refactor"
  | "Test";

/**
 * Статус выполнения задачи.
 */
export type TaskStatus = "To Do" | "In Progress" | "Done";

/**
 * Приоритет задачи.
 */
export type TaskPriority = "Low" | "Medium" | "High";

/**
 * Модель задачи.
 */
export interface Task {
  /** Уникальный идентификатор */
  id: string;

  /** Краткий заголовок задачи */
  title: string;

  /** Опциональное описание задачи */
  description?: string;

  /** Категория задачи */
  category: TaskCategory;

  /** Статус выполнения */
  status: TaskStatus;

  /** Приоритет */
  priority: TaskPriority;

  /** Дата создания задачи */
  createdAt?: string;
}
