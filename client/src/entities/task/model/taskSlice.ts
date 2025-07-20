import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@shared/types/task";
import { fetchTasks } from "./thunks/fetchTasks";
import { createTask } from "./thunks/createTask";
import { updateTaskOnServer } from "./thunks/updateTask";
import { deleteTaskFromServer } from "./thunks/deleteTask";

type TaskState = {
  tasks: Task[];
  isLoading: boolean;
};

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
};

/**
 * Redux-срез для управления задачами:
 * - добавление;
 * - обновление;
 * - удаление;
 * - загрузка с сервера;
 * - создание новой задачи.
 */
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /**
     * Обновляет задачу по id.
     */
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    /**
     * Локальное добавление задачи (если нужно).
     */
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },

    /**
     * Удаляет задачу по id.
     */
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },

  selectors: {
    /**
     * Получить все задачи.
     */
    selectTasks: (state) => state.tasks,

    /**
     * Получить задачу по её id.
     */
    selectTaskById: (state, id: string) =>
      state.tasks.find((task) => task.id === id),

    /**
     * Получить флаг загрузки.
     */
    selectIsLoading: (state) => state.isLoading,
  },

  extraReducers: (builder) => {
    builder
      // Загрузка задач
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        console.error("fetchTasks.rejected:", action.error);
      })

      // Создание задачи
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        console.error("createTask.rejected:", action.error);
      })

      // Обновление задачи
      .addCase(updateTaskOnServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskOnServer.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(updateTaskOnServer.rejected, (state, action) => {
        state.isLoading = false;
        console.error("updateTask.rejected:", action.error);
      })
      .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTaskFromServer.rejected, (_, action) => {
        console.error("deleteTask.rejected:", action.error);
      });
  },
});

export const { updateTask, addTask, deleteTask } = taskSlice.actions;
export const { selectTasks, selectTaskById, selectIsLoading } =
  taskSlice.selectors;
export const taskReducer = taskSlice.reducer;
