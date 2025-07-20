import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { ROUTES } from "@shared/config/routes";
import {
  validateAllFields,
  validateField,
} from "@shared/validators/formValidators";
import type { Task } from "@shared/types/task";
import { v4 as uuidv4 } from "uuid";
import { createTask } from "@entities/task/model/thunks/createTask";
import {
  addTask,
  deleteTask,
  updateTask,
} from "@entities/task/model/taskSlice";

/**
 * Хук управления формой добавления задачи.
 * Поддерживает валидацию, автофокус и оптимистичное добавление.
 */
export const useAddTaskForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Инициализация новой задачи
  const [task, setTask] = useState<Task>({
    id: uuidv4(),
    title: "",
    description: "",
    category: "Bug",
    status: "To Do",
    priority: "Medium",
    createdAt: new Date().toISOString(),
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Task, string>>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const hasFocused = useRef(false);

  // Фокус на первом рендере
  useEffect(() => {
    if (hasFocused.current) return;
    const raf = requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
        hasFocused.current = true;
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Обновление поля и валидация
  const handleChange = <K extends keyof Task>(field: K, value: Task[K]) => {
    const updated = { ...task, [field]: value };
    setTask(updated);
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Сохранение задачи (оптимистично)
  const handleSave = async () => {
    const newErrors = validateAllFields(task);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(addTask(task)); // 1. Оптимистично добавляем

    try {
      const result = await dispatch(createTask(task)).unwrap(); // 2. Отправляем на сервер

      dispatch(updateTask(result)); // 3. Заменяем на серверную (если отличается)
      navigate(ROUTES.HOME);
    } catch (err) {
      dispatch(deleteTask(task.id)); // 4. Откат при ошибке
      console.error("Ошибка при создании задачи:", err);
      // Тут можно показать toast-уведомление
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

  const isValid = Object.values(validateAllFields(task)).every((e) => !e);

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
