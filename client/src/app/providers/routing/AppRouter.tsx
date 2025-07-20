import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Home } from "@pages/Home";
import { TaskDetails } from "@features/edit-task/ui/TaskDetails";
import { AddTaskForm } from "@features/add-task/ui/AddTaskForm";
import { ROUTES } from "@shared/config/routes";
import { BaseModal } from "@shared/ui/BaseModal";
import { NotFound } from "@pages/NotFound";

/**
 * Главный компонент маршрутизации приложения.
 * Обрабатывает как обычные маршруты, так и модальные окна через backgroundLocation.
 */
export default function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const navigate = useNavigate();

  /**
   * Закрытие модального окна, возвращает на главный экран.
   */
  const handleClose = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <>
      {/* Основные маршруты (в том числе "на фоне" при открытии модального окна) */}
      <Routes location={backgroundLocation || location}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.TASK()} element={<TaskDetails />} />
        <Route path={ROUTES.ADD_TASK} element={<AddTaskForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Отдельные модальные маршруты поверх текущей страницы */}
      {backgroundLocation && (
        <Routes>
          <Route
            path={ROUTES.TASK()}
            element={
              <BaseModal onClose={handleClose} labelledBy="edit-task">
                <TaskDetails />
              </BaseModal>
            }
          />
          <Route
            path={ROUTES.ADD_TASK}
            element={
              <BaseModal onClose={handleClose} labelledBy="add-task">
                <AddTaskForm />
              </BaseModal>
            }
          />
        </Routes>
      )}
    </>
  );
}
