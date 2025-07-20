import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { useAppSelector } from "@shared/hooks/useAppSelector";
import { selectTaskById, updateTask } from "@entities/task/model/taskSlice";
import { ROUTES } from "@shared/config/routes";
import {
  validateAllFields,
  validateField,
} from "@shared/validators/formValidators";
import type { Task } from "@shared/types/task";

/**
 * Хук управления формой редактирования задачи.
 * Загружает данные по ID из стора, валидирует, фокусирует input при открытии модального окна.
 *
 * @param id — идентификатор редактируемой задачи (опционален)
 */
export const useTaskForm = (id?: string) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Загружаем задачу из стора, если передан ID
  const existingTask = useAppSelector((state) =>
    id ? selectTaskById(state, id) : null,
  );

  // Локальное состояние формы
  const [task, setTask] = useState<Task | null>(existingTask ?? null);
  const [errors, setErrors] = useState<Partial<Record<keyof Task, string>>>({});

  // Реф на первый input и флаг фокуса
  const inputRef = useRef<HTMLInputElement>(null);
  const hasFocused = useRef(false);

  // Загружаем задачу при изменении ID
  useEffect(() => {
    if (!id) return;
    if (!existingTask) {
      navigate(ROUTES.HOME); // редирект, если задача не найдена
    } else {
      setTask(existingTask);
    }
  }, [id, existingTask, navigate]);

  // Автофокус при открытии модалки (через кастомное событие)
  useEffect(() => {
    const handleFocus = () => {
      if (inputRef.current && !hasFocused.current) {
        inputRef.current.focus();
        inputRef.current.select();
        hasFocused.current = true;
      }
    };

    document.addEventListener("modal-opened", handleFocus);
    return () => document.removeEventListener("modal-opened", handleFocus);
  }, []);

  /**
   * Обновляет поле задачи и валидирует его.
   */
  const handleChange = <K extends keyof Task>(field: K, value: Task[K]) => {
    if (!task) return;

    const updated = { ...task, [field]: value };
    setTask(updated);

    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  /**
   * Сохраняет изменения задачи, если форма валидна.
   */
  const handleSave = () => {
    if (!task) return;
    const newErrors = validateAllFields(task);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(updateTask(task));
    navigate(ROUTES.HOME);
  };

  /** Отмена редактирования — возврат на главную */
  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

  /** Общая валидность формы */
  const isValid = Object.values(validateAllFields(task || ({} as Task))).every(
    (e) => !e,
  );

  return {
    task,
    errors,
    inputRef,
    handleChange,
    handleSave,
    handleCancel,
    isValid,
  };
};
