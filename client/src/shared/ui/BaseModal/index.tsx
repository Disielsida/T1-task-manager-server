import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@admiral-ds/react-ui";
import styles from "./BaseModal.module.css";

/**
 * Базовый модальный компонент.
 * Оборачивает Modal от Admiral DS, добавляет адаптивность, закрытие по Esc
 * и кастомное событие для фокусировки в дочерних компонентах.
 */
interface BaseModalProps {
  /** Функция закрытия модального окна */
  onClose: () => void;

  /** Контент внутри модального окна */
  children: React.ReactNode;

  /** ID заголовка модалки для ARIA-атрибута `aria-labelledby` */
  labelledBy?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  onClose,
  children,
  labelledBy = "modal-edit",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  /** Определение мобильного устройства по ширине экрана */
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false,
  );

  /** Обновляем флаг `isMobile` при изменении ширины экрана */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  /** Закрытие модального окна по нажатию клавиши Escape */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  /**
   * Добавление CSS-класса для блокировки прокрутки
   * и эмит кастомного события `modal-opened` для фокусировки
   */
  useEffect(() => {
    document.documentElement.classList.add("modal-open");

    requestAnimationFrame(() => {
      document.dispatchEvent(new Event("modal-opened"));
    });

    return () => {
      document.documentElement.classList.remove("modal-open");
    };
  }, []);

  return (
    <Modal aria-labelledby={labelledBy} onClose={onClose} mobile={isMobile}>
      <div ref={modalRef} className={styles.modalContent}>
        {children}
      </div>
    </Modal>
  );
};
