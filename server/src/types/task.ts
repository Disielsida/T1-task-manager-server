/**
 * Возможные категории задачи.
 * @typedef {"Bug" | "Feature" | "Documentation" | "Refactor" | "Test"} TaskCategory
 */
export type TaskCategory =
  | "Bug"
  | "Feature"
  | "Documentation"
  | "Refactor"
  | "Test";

/**
 * Возможные статусы задачи.
 * @typedef {"To Do" | "In Progress" | "Done"} TaskStatus
 */
export type TaskStatus = "To Do" | "In Progress" | "Done";

/**
 * Возможные приоритеты задачи.
 * @typedef {"Low" | "Medium" | "High"} TaskPriority
 */
export type TaskPriority = "Low" | "Medium" | "High";

/**
 * Представляет задачу в системе управления задачами.
 *
 * @typedef {Object} Task
 * @property {string} id - Уникальный идентификатор задачи (UUID)
 * @property {string} title - Название задачи
 * @property {string} [description] - Описание задачи (необязательное)
 * @property {TaskCategory} category - Категория задачи
 * @property {TaskStatus} status - Текущий статус задачи
 * @property {TaskPriority} priority - Приоритет задачи
 * @property {string} createdAt - Дата и время создания (ISO-строка)
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}
