import React, { useState } from "react";
import { Button, Tag, T } from "@admiral-ds/react-ui";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@shared/config/routes";
import type { Task } from "@shared/types/task";
import { ServiceCloseOutline } from "@admiral-ds/icons";
import { DeleteTaskConfirmModal } from "@features/delete-task/ui/DeleteTaskModalConfirm";
import { useDeleteTask } from "@features/delete-task/model/useDeleteTask";
import styles from "./TaskItem.module.css";

type TaskItemProps = {
  task: Task;
};

/**
 * Компонент карточки задачи.
 * Отображает заголовок, описание, метки и кнопки управления задачей.
 * Поддерживает удаление задачи через модальное окно подтверждения.
 */
export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const location = useLocation();
  const { removeTask } = useDeleteTask(); // Хук удаления задачи
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модалки удаления

  return (
    <>
      {/* Карточка задачи */}
      <div className={styles.card}>
        <div className={styles.body}>
          <div className={styles.header}>
            <T as="h4" font="Header/H4" className={styles.title}>
              {task.title}
            </T>

            {/* Кнопка удаления */}
            <button
              className={styles.deleteBtn}
              onClick={() => setIsModalOpen(true)}
              aria-label="Удалить задачу"
              title="Удалить задачу"
            >
              <ServiceCloseOutline />
            </button>
          </div>

          {/* Описание задачи, если есть */}
          {task.description && (
            <div className={styles.description}>
              <T as="p" font="Body/Body 2 Long">
                {task.description}
              </T>
            </div>
          )}

          {/* Метки категории, статуса и приоритета */}
          <div className={styles.tags}>
            <Tag dimension="m" kind="success" statusViaBackground>
              {task.category}
            </Tag>
            <Tag dimension="m" kind="primary" statusViaBackground>
              {task.status}
            </Tag>
            <Tag dimension="m" kind="warning" statusViaBackground>
              {task.priority}
            </Tag>
          </div>
        </div>

        {/* Кнопка редактирования */}
        <div className={styles.footer}>
          <Link
            to={ROUTES.TASK(task.id)}
            state={{ backgroundLocation: location }}
          >
            <Button
              className={styles.button}
              dimension="s"
              appearance="secondary"
            >
              Редактировать
            </Button>
          </Link>
        </div>
      </div>

      {/* Модальное окно подтверждения удаления */}
      <DeleteTaskConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          removeTask(task.id);
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
