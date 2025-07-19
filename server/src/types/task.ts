/**
 * Тип категории задачи.
 */
export type TaskCategory =
  | "Bug"
  | "Feature"
  | "Documentation"
  | "Refactor"
  | "Test";

/**
 * Тип статуса задачи.
 */
export type TaskStatus = "To Do" | "In Progress" | "Done";

/**
 * Тип приоритета задачи.
 */
export type TaskPriority = "Low" | "Medium" | "High";

/**
 * Интерфейс задачи, используемый на сервере.
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string; // ISO-строка даты
}
