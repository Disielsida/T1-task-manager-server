import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { deleteTaskFromServer } from "@entities/task/model/thunks/deleteTask";

/**
 * Хук для удаления задачи с сервера.
 * Оборачивает санку deleteTaskFromServer в удобную функцию.
 */
export const useDeleteTask = () => {
  const dispatch = useAppDispatch();

  /**
   * Удаляет задачу по ID через сервер.
   * @param id - идентификатор задачи
   */
  const removeTask = (id: string) => {
    dispatch(deleteTaskFromServer(id));
  };

  return { removeTask };
};
