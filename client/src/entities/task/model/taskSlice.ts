import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@shared/types/task";
import { initialTasks } from "@shared/data/initialTasks";
import { loadTasks, saveTasks } from "@shared/lib/storage";

type TaskState = {
  tasks: Task[];
};

/**
 * Загружаем задачи из localStorage.
 * Если список пуст — используем initialTasks и сразу сохраняем их.
 */
const loadedTasks = loadTasks();
const isEmpty = loadedTasks.length === 0;
const effectiveTasks = isEmpty ? initialTasks : loadedTasks;

if (isEmpty) {
  saveTasks(initialTasks);
}

const initialState: TaskState = {
  tasks: effectiveTasks,
};

/**
 * Redux-срез для управления задачами:
 * - добавление;
 * - обновление;
 * - удаление;
 * - селекторы;
 * - синхронизация с localStorage.
 */
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /**
     * Обновляет задачу по id и сохраняет в localStorage.
     * @param state Текущее состояние
     * @param action Обновлённая задача
     */
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasks(state.tasks);
      }
    },

    /**
     * Добавляет новую задачу и сохраняет в localStorage.
     * @param state Текущее состояние
     * @param action Новая задача
     */
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },

    /**
     * Удаляет задачу по id и сохраняет в localStorage.
     * @param state Текущее состояние
     * @param action id задачи для удаления
     */
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },
  },

  selectors: {
    /**
     * Получить все задачи из состояния.
     * @param state Состояние среза
     */
    selectTasks: (state) => state.tasks,

    /**
     * Получить задачу по её id.
     * @param state Состояние среза
     * @param id Идентификатор задачи
     */
    selectTaskById: (state, id: string) =>
      state.tasks.find((task) => task.id === id),
  },
});

export const { updateTask, addTask, deleteTask } = taskSlice.actions;
export const { selectTasks, selectTaskById } = taskSlice.selectors;
export const taskReducer = taskSlice.reducer;
