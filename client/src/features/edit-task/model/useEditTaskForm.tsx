import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { useAppSelector } from "@shared/hooks/useAppSelector";
import { selectTaskById } from "@entities/task/model/taskSlice";
import { updateTaskOnServer } from "@entities/task/model/thunks/updateTask";
import { ROUTES } from "@shared/config/routes";
import {
  validateAllFields,
  validateField,
} from "@shared/validators/formValidators";
import type { Task } from "@shared/types/task";

/**
 * Хук управления формой редактирования задачи.
 * Загружает задачу из стора, валидирует форму, отправляет PATCH-запрос.
 */
export const useTaskForm = (id?: string) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const existingTask = useAppSelector((state) =>
    id ? selectTaskById(state, id) : null,
  );

  const [task, setTask] = useState<Task | null>(existingTask ?? null);
  const [errors, setErrors] = useState<Partial<Record<keyof Task, string>>>({});

  const inputRef = useRef<HTMLInputElement>(null);
  const hasFocused = useRef(false);

  // Проверка, если задача не найдена — редирект
  useEffect(() => {
    if (!id) return;
    if (!existingTask) {
      navigate(ROUTES.HOME);
    } else {
      setTask(existingTask);
    }
  }, [id, existingTask, navigate]);

  // Автофокус при открытии модального окна
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

  // Обновление конкретного поля и валидация
  const handleChange = <K extends keyof Task>(field: K, value: Task[K]) => {
    if (!task) return;

    const updated = { ...task, [field]: value };
    setTask(updated);

    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Обработка сохранения изменений
  const handleSave = async () => {
    if (!task) return;

    const newErrors = validateAllFields(task);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await dispatch(updateTaskOnServer(task));
      if (updateTaskOnServer.fulfilled.match(result)) {
        navigate(ROUTES.HOME);
      } else {
        console.error(
          "Ошибка при обновлении задачи:",
          result.payload ?? result.error,
        );
      }
    } catch (err) {
      console.error("Неожиданная ошибка:", err);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

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
