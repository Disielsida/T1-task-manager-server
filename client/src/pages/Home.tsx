import React, { useMemo, useEffect, useState } from "react";
import { T, Spinner } from "@admiral-ds/react-ui";
import { TaskList } from "@widgets/TaskList";
import { useAppSelector } from "@shared/hooks/useAppSelector";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { fetchTasks } from "@entities/task/model/thunks/fetchTasks";
import { selectIsLoading, selectTasks } from "@entities/task/model/taskSlice";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { TaskFilters } from "@widgets/TaskFilters";
import { Footer } from "@widgets/Footer";
import { ServicePlusCircleOutline } from "@admiral-ds/icons";
import { ROUTES } from "@shared/config/routes";
import "@shared/styles/index.css";

/**
 * Главная страница приложения "Менеджер задач".
 * Отображает список задач с возможностью фильтрации по категории, статусу и приоритету.
 * Также содержит кнопку для добавления новой задачи через модальное окно.
 */
export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const isLoading = useAppSelector(selectIsLoading);

  // Загружаем задачи при монтировании компонента
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";
  const status = searchParams.get("status") || "All";
  const priority = searchParams.get("priority") || "All";

  const navigate = useNavigate();
  const location = useLocation();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchCategory = category === "All" || task.category === category;
      const matchStatus = status === "All" || task.status === status;
      const matchPriority = priority === "All" || task.priority === priority;
      return matchCategory && matchStatus && matchPriority;
    });
  }, [tasks, category, status, priority]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

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

          <TaskFilters />
        </div>

        {/* Спиннер при загрузке */}
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
