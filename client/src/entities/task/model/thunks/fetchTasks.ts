import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "@shared/types/task";
import { API_BASE_URL } from "@shared/config/api";

/**
 * thunk для получения всех задач с возмодностью фильтрации по строке в заголовке.
 */
export const fetchTasks = createAsyncThunk<
  Task[],
  { title?: string } | undefined
>("tasks/fetchAll", async (params) => {
  const query = new URLSearchParams();
  if (params?.title) {
    query.set("title", params.title);
  }

  const res = await fetch(`${API_BASE_URL}/tasks?${query.toString()}`);
  const data = await res.json();
  return data;
});
