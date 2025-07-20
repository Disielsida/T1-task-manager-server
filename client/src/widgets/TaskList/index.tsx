import React from "react";
import type { Task } from "@shared/types/task";
import { TaskItem } from "@entities/task/ui/TaskItem";
import styles from "./TaskList.module.css";

/**
 * Свойства компонента TaskList.
 *
 * @property tasks - Список задач для отображения
 */
interface TaskListProps {
  tasks: Task[];
}

/**
 * Компонент списка задач.
 *
 * Отображает сетку карточек задач с помощью компонента `TaskItem`.
 * Каждая задача передаётся в `TaskItem` как проп `task`.
 *
 * Используется, например, на главной странице с фильтрацией.
 */
export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className={styles.grid}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
