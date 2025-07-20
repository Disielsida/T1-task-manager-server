import type { Task } from "@shared/types/task";

/**
 * Объект с ошибками по ключам полей задачи.
 */
export type TaskErrors = Partial<Record<keyof Task, string>>;

/**
 * Валидирует отдельное поле задачи.
 * @param field - Имя поля задачи.
 * @param value - Значение поля.
 * @returns Текст ошибки или пустую строку.
 */
export const validateField = (
  field: keyof Task,
  value: Task[keyof Task],
): string => {
  switch (field) {
    case "title":
      return typeof value === "string" && value.trim() === ""
        ? "Заголовок не может быть пустым"
        : "";
    case "description":
      return typeof value === "string" && value.length > 300
        ? "Описание слишком длинное"
        : "";
    default:
      return "";
  }
};

/**
 * Валидирует все поля задачи.
 * @param task - Объект задачи.
 * @returns Объект с ошибками по каждому полю.
 */
export const validateAllFields = (task: Task): TaskErrors => {
  const result: TaskErrors = {};

  (Object.keys(task) as (keyof Task)[]).forEach((field) => {
    const error = validateField(field, task[field]);
    if (error) {
      result[field] = error;
    }
  });

  return result;
};
