import React, { useState, useMemo, useEffect, type ChangeEvent } from "react";
import { EditMode, T } from "@admiral-ds/react-ui";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import styles from "./SearchTasksInput.module.css";

/**
 * Компонент поиска задач по заголовку на основе EditMode.
 */
export const SearchTasksInput: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTitle = searchParams.get("title") || "";
  const [localValue, setLocalValue] = useState(initialTitle);

  const debouncedUpdateParams = useMemo(
    () =>
      debounce((value: string) => {
        const next = new URLSearchParams(searchParams);
        if (value) {
          next.set("title", value);
        } else {
          next.delete("title");
        }
        setSearchParams(next);
      }, 400),
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    return () => debouncedUpdateParams.cancel();
  }, [debouncedUpdateParams]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setLocalValue(value);
    debouncedUpdateParams(value);
  };

  const handleCancel = () => {
    setLocalValue("");
    const next = new URLSearchParams(searchParams);
    next.delete("title");
    setSearchParams(next);
  };

  const handleConfirm = () => {
    debouncedUpdateParams.flush();
    setLocalValue("");
    const next = new URLSearchParams(searchParams);
    setSearchParams(next);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelWrapper}>
        <T
          font="Subtitle/Subtitle 1"
          color="Neutral/Neutral 50"
          className={styles.label}
        >
          Поиск по заголовку:
        </T>
        <div className={styles.inputWrapper}>
          <EditMode
            value={localValue}
            onChange={handleChange}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            placeholder="Заголовок..."
            dimension="m"
            confirmButtonPropsConfig={() => ({
              "aria-label": "Применить поиск",
            })}
            cancelButtonPropsConfig={() => ({
              "aria-label": "Очистить поиск",
            })}
          />
        </div>
      </div>
    </div>
  );
};
