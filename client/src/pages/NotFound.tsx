import { T, Button } from "@admiral-ds/react-ui";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@shared/config/routes";
import { useEffect, useState } from "react";

/**
 * Страница 404 — отображается при попытке перехода на несуществующий маршрут.
 */
export const NotFound = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  // Отслеживаем размер экрана для адаптивного заголовка
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

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
                Страница не найдена
              </T>
            </div>

            <div className="titleUnderline" />
          </div>

          <T as="p" font="Subtitle/Subtitle 1">
            К сожалению, такой страницы не существует. <br />
            Возможно, вы перешли по неверной ссылке.
          </T>

          <Button
            appearance="primary"
            onClick={() => navigate(ROUTES.HOME)}
            dimension="l"
          >
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
};
