import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "@shared/config/api";

/**
 * thunk для удаления задачи.
 */
export const deleteTaskFromServer = createAsyncThunk<
  string, // Возвращаем ID удалённой задачи
  string, // Входной аргумент — ID задачи
  { rejectValue: string }
>("tasks/delete", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Не удалось удалить задачу");
    }

    return id;
  } catch (error) {
    return rejectWithValue(`Ошибка при удалении задачи: ${String(error)}`);
  }
});
