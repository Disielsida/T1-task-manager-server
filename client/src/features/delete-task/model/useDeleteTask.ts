import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { deleteTask } from "@entities/task/model/taskSlice";

/**
 * Хук для удаления задачи.
 * Оборачивает Redux-экшен deleteTask в удобную функцию.
 */
export const useDeleteTask = () => {
  const dispatch = useAppDispatch();

  /**
   * Удаляет задачу по ID.
   * @param id - идентификатор задачи
   */
  const removeTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  return { removeTask };
};
