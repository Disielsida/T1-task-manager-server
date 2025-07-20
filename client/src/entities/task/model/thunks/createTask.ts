import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "@shared/types/task";
import { API_BASE_URL } from "@shared/config/api";

/**
 * Thunk для создания новой задачи на сервере.
 * При успехе возвращает созданную задачу.
 */
export const createTask = createAsyncThunk<Task, Task>(
  "tasks/create",
  async (task, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      // Проверка на успешный ответ
      if (!response.ok) {
        const errorText = await response.text();
        return rejectWithValue(`Ошибка при создании задачи: ${errorText}`);
      }

      const createdTask: Task = await response.json();
      return createdTask;
    } catch (error) {
      // Гарантированно приведение ошибки к строке
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      return rejectWithValue(`Ошибка при создании задачи: ${message}`);
    }
  },
);
