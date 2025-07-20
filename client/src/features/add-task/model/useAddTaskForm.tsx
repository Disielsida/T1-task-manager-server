import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { addTask } from "@entities/task/model/taskSlice";
import {
  validateAllFields,
  validateField,
} from "@shared/validators/formValidators";
import { ROUTES } from "@shared/config/routes";
import type { Task } from "@shared/types/task";
import { v4 as uuidv4 } from "uuid";

/**
 * Хук управления формой добавления задачи.
 * Содержит логику валидации, управления состоянием, фокусировки и навигации.
 */
export const useAddTaskForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**
   * Начальное состояние новой задачи с уникальным ID.
   */
  const [task, setTask] = useState<Task>({
    id: uuidv4(),
    title: "",
    description: "",
    category: "Bug",
    status: "To Do",
    priority: "Medium",
  });

  /**
   * Ошибки валидации по каждому полю.
   */
  const [errors, setErrors] = useState<Partial<Record<keyof Task, string>>>({});

  /**
   * Реф для фокусировки на первом инпуте.
   */
  const inputRef = useRef<HTMLInputElement>(null);
  const hasFocused = useRef(false);

  /**
   * Эффект для фокусировки на поле ввода при первом рендере.
   */
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

  /**
   * Обновление значения поля формы и валидация по мере ввода.
   */
  const handleChange = <K extends keyof Task>(field: K, value: Task[K]) => {
    const updated = { ...task, [field]: value };
    setTask(updated);

    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  /**
   * Обработка сохранения: валидация и отправка задачи в Redux.
   */
  const handleSave = () => {
    const newErrors = validateAllFields(task);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(addTask(task));
    navigate(ROUTES.HOME);
  };

  /**
   * Обработка отмены — возврат на главную страницу.
   */
  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

  /**
   * Глобальный валидатор для формы.
   */
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

