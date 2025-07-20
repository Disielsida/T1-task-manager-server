import type { Task } from "../types/task";

/**
 * Начальный список задач, используемый при первом запуске приложения
 * или в случае отсутствия данных в localStorage.
 */
export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Fix login bug",
    description: "Users cannot log in with social accounts.",
    category: "Bug",
    status: "To Do",
    priority: "High",
  },
  {
    id: "2",
    title: "Implement dark mode",
    description: "Add theme switcher to settings page.",
    category: "Feature",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "3",
    title: "Write API documentation",
    description: "Describe all endpoints in Swagger format.",
    category: "Documentation",
    status: "Done",
    priority: "Low",
  },
];
