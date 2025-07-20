import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  InputField,
  Button,
  T,
  TextField,
  SelectField,
  Option,
} from "@admiral-ds/react-ui";
import { useTaskForm } from "@features/edit-task/model/useEditTaskForm";
import styles from "./TaskDetails.module.css";
import type {
  TaskCategory,
  TaskStatus,
  TaskPriority,
} from "@shared/types/task";
import {
  categoryOptions,
  statusOptions,
  priorityOptions,
} from "@shared/constants/taskOptions";

/**
 * Компонент формы редактирования задачи.
 * Загружает данные задачи по `id` из URL, позволяет изменить поля и сохранить изменения.
 */
export const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Хук управления формой редактирования задачи (в т.ч. валидация, автофокус, переход)
  const {
    task,
    errors,
    inputRef,
    handleChange,
    handleSave,
    handleCancel,
    isValid,
  } = useTaskForm(id);

  const [isMobile, setIsMobile] = useState(false);

  // Отслеживаем изменение размера экрана для адаптации заголовка
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Не рендерим форму, если задача не найдена
  if (!task) return null;

  /**
   * Обработчик отправки формы — вызывает сохранение, если все поля валидны.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  /**
   * Отображение опций выпадающих списков (категория, статус, приоритет).
   */
  const renderSelectOptions = <T extends string>(
    options: { id: T; label: string }[],
  ) => {
    return options.map((option) => (
      <Option key={option.id} value={option.id}>
        {option.label}
      </Option>
    ));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.titleBlock}>
        <div className={styles.titleWithUnderline}>
          <T
            font={isMobile ? "Header/H1" : "Header/HL3"}
            as="h1"
            className={styles.heading}
          >
            Редактирование
            <br />
            задачи
          </T>
          <div className={styles.titleUnderline} />
        </div>
      </div>

      {/* Заголовок задачи */}
      <InputField
        label="Заголовок"
        value={task.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Введите заголовок задачи"
        ref={inputRef}
        status={errors.title ? "error" : undefined}
        extraText={errors.title}
      />

      {/* Описание задачи */}
      <TextField
        label="Описание"
        placeholder="Введите описание задачи"
        value={task.description ?? ""}
        onChange={(e) => handleChange("description", e.target.value)}
        status={errors.description ? "error" : undefined}
        extraText={errors.description}
        dimension="m"
        rows={4}
        maxRows={6}
      />

      {/* Категория задачи */}
      <SelectField
        label="Категория"
        placeholder="Выберите категорию"
        mode="select"
        value={task.category}
        onChange={(e) =>
          handleChange("category", e.target.value as TaskCategory)
        }
        status={errors.category ? "error" : undefined}
        extraText={errors.category}
        dimension="m"
      >
        {renderSelectOptions(categoryOptions)}
      </SelectField>

      {/* Статус задачи */}
      <SelectField
        label="Статус"
        placeholder="Выберите статус"
        mode="select"
        value={task.status}
        onChange={(e) => handleChange("status", e.target.value as TaskStatus)}
        status={errors.status ? "error" : undefined}
        extraText={errors.status}
        dimension="m"
      >
        {renderSelectOptions(statusOptions)}
      </SelectField>

      {/* Приоритет задачи */}
      <SelectField
        label="Приоритет"
        placeholder="Выберите приоритет"
        mode="select"
        value={task.priority}
        onChange={(e) =>
          handleChange("priority", e.target.value as TaskPriority)
        }
        status={errors.priority ? "error" : undefined}
        extraText={errors.priority}
        dimension="m"
      >
        {renderSelectOptions(priorityOptions)}
      </SelectField>

      {/* Кнопки управления */}
      <div className={styles.buttons}>
        <Button dimension="m" appearance="secondary" onClick={handleCancel}>
          Отмена
        </Button>
        <Button
          dimension="m"
          appearance="primary"
          onClick={handleSave}
          disabled={!isValid}
          type="submit"
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};
