import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "@shared/types/task";
import { API_BASE_URL } from "@shared/config/api";

/**
 * thunk для получения всех задач.
 */
export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchAll",
  async () => {
    const res = await fetch(`${API_BASE_URL}/tasks`);
    const data = await res.json();
    return data;
  },
);
