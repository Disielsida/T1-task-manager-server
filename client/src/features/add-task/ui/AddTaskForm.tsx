import React, { useEffect, useState } from "react";
import {
  InputField,
  TextField,
  SelectField,
  Option,
  Button,
  T,
} from "@admiral-ds/react-ui";
import { useAddTaskForm } from "@features/add-task/model/useAddTaskForm";
import styles from "./AddTaskForm.module.css";
import {
  categoryOptions,
  statusOptions,
  priorityOptions,
} from "@shared/constants/taskOptions";
import type {
  TaskCategory,
  TaskStatus,
  TaskPriority,
} from "@shared/types/task";

/**
 * Форма создания новой задачи.
 * Содержит поля ввода и селекты с валидацией.
 * Поддерживает адаптивность и автоматический фокус на первом поле.
 */
export const AddTaskForm: React.FC = () => {
  const {
    task,
    errors,
    inputRef,
    handleChange,
    handleSave,
    handleCancel,
    isValid,
  } = useAddTaskForm();

  const [isMobile, setIsMobile] = useState(false);

  /**
   * Хук следит за шириной экрана и обновляет состояние `isMobile`,
   * чтобы адаптировать заголовок под мобильные устройства.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  /**
   * Обработчик отправки формы.
   * Предотвращает поведение по умолчанию и вызывает сохранение.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  /**
   * Генерация JSX-опций для компонента SelectField.
   * @param options - массив объектов с id и label.
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

  /**
   * Форма добавления задачи с валидацией.
   * Автоматически подставляет фокус на первый инпут.
   */
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {/* Заголовок с адаптивным размером шрифта */}
      <div className={styles.titleBlock}>
        <div className={styles.titleWithUnderline}>
          <T
            font={isMobile ? "Header/H1" : "Header/HL3"}
            as="h1"
            className={styles.heading}
          >
            Новая задача
          </T>
          <div className={styles.titleUnderline} />
        </div>
      </div>

      {/* Поле заголовка задачи */}
      <InputField
        label="Заголовок"
        placeholder="Введите заголовок задачи"
        value={task.title}
        onChange={(e) => handleChange("title", e.target.value)}
        status={errors.title ? "error" : undefined}
        extraText={errors.title}
        ref={inputRef} // фокус на это поле при монтировании
      />

      {/* Поле описания задачи */}
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

      {/* Селект: категория задачи */}
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

      {/* Селект: статус задачи */}
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

      {/* Селект: приоритет задачи */}
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

      {/* Кнопки действий */}
      <div className={styles.buttons}>
        <Button appearance="secondary" onClick={handleCancel} dimension="m">
          Отмена
        </Button>
        <Button
          appearance="primary"
          type="submit"
          disabled={!isValid}
          dimension="m"
        >
          Создать
        </Button>
      </div>
    </form>
  );
};
