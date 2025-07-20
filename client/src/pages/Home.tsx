import React, { useMemo, useEffect, useState } from "react";
import { T, Spinner } from "@admiral-ds/react-ui";
import { TaskList } from "@widgets/TaskList";
import { useAppSelector } from "@shared/hooks/useAppSelector";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { fetchTasks } from "@entities/task/model/thunks/fetchTasks";
import { selectIsLoading, selectTasks } from "@entities/task/model/taskSlice";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { TaskFilters } from "@widgets/TaskFilters";
import { SearchTasksInput } from "@features/search-tasks-by-title";
import { Footer } from "@widgets/Footer";
import { ServicePlusCircleOutline } from "@admiral-ds/icons";
import { ROUTES } from "@shared/config/routes";
import "@shared/styles/index.css";

/**
 * Главная страница приложения "Менеджер задач".
 * Отображает список задач с возможностью фильтрации по категории, статусу, приоритету и заголовку.
 * Также содержит кнопку для добавления новой задачи.
 */
export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const isLoading = useAppSelector(selectIsLoading);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";
  const status = searchParams.get("status") || "All";
  const priority = searchParams.get("priority") || "All";
  const title = searchParams.get("title") || "";

  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(false);

  // Обновляем медиа-состояние
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Загружаем задачи с учётом title
  useEffect(() => {
    dispatch(title ? fetchTasks({ title }) : fetchTasks());
  }, [dispatch, title]);

  // Применяем клиентскую фильтрацию (категория, статус, приоритет)
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchCategory = category === "All" || task.category === category;
      const matchStatus = status === "All" || task.status === status;
      const matchPriority = priority === "All" || task.priority === priority;
      return matchCategory && matchStatus && matchPriority;
    });
  }, [tasks, category, status, priority]);

  const handleAddClick = () => {
    navigate(ROUTES.ADD_TASK, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <div className="pageLayout">
      <div className="container">
        <div className="titleBlock">
          <div className="titleWithUnderline">
            <div className="titleRow">
              <T
                font={isMobile ? "Header/HL2" : "Header/HL1"}
                as="h1"
                className="pageTitle"
              >
                Менеджер задач
              </T>

              <button
                className="addTaskBtn"
                title="Добавить задачу"
                aria-label="Добавить задачу"
                onClick={handleAddClick}
              >
                <ServicePlusCircleOutline />
              </button>
            </div>

            <div className="titleUnderline" />
          </div>

          {/* UI-фильтры */}
          <TaskFilters />
          <SearchTasksInput />
        </div>

        {/* Спиннер или Список задач */}
        {isLoading ? (
          <div className="spinner">
            <Spinner dimension="l" />
          </div>
        ) : (
          <TaskList tasks={filteredTasks} />
        )}
      </div>

      <Footer />
    </div>
  );
};
