import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

export const tasks: Task[] = [
  {
    id: uuidv4(),
    title: "Fix login bug",
    description: "Login fails when password contains special characters",
    category: "Bug",
    status: "To Do",
    priority: "High",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Implement dark mode",
    description: "Add theme toggle for dark mode",
    category: "Feature",
    status: "In Progress",
    priority: "Medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Update README",
    description: "Add usage instructions",
    category: "Documentation",
    status: "Done",
    priority: "Low",
    createdAt: new Date().toISOString(),
  },
];
