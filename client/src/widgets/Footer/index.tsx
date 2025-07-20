import React from "react";
import { Divider, T } from "@admiral-ds/react-ui";
import styles from "./Footer.module.css";

/**
 * Компонент нижнего колонтитула (footer) приложения.
 * Отображает разделитель и служебный текст.
 */
export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <Divider className={styles.divider} />
        <T font="Body/Body 2 Long" className={styles.text}>
          © Т1. Все права защищены.
        </T>
      </div>
    </footer>
  );
};

