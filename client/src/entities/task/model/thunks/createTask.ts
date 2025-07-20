import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "@shared/types/task";
import { API_BASE_URL } from "@shared/config/api";

/**
 * thunk для создания новой задачи на сервере.
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

      if (!response.ok) {
        throw new Error("Не удалось создать задачу");
      }

      const data: Task = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(`Ошибка при создании задачи: ${error}`);
    }
  },
);
