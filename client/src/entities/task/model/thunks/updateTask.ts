import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "@shared/types/task";
import { API_BASE_URL } from "@shared/config/api";

/**
 * thunk для обновления задачи на сервере.
 */
export const updateTaskOnServer = createAsyncThunk<Task, Task>(
  "tasks/update",
  async (task, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Не удалось обновить задачу");
      }

      const updatedTask: Task = await response.json();
      return updatedTask;
    } catch (error) {
      return rejectWithValue(`Ошибка при обновлении задачи: ${error}`);
    }
  },
);
