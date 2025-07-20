import { SelectField, Option } from "@admiral-ds/react-ui";
import { useSearchParams } from "react-router-dom";
import {
  categoryOptions,
  statusOptions,
  priorityOptions,
} from "@shared/constants/taskOptions";
import styles from "./TaskFilters.module.css";

/**
 * Генерирует JSX-опции для SelectField, включая вариант "Все".
 * @template T Тип значения опции (строка)
 * @param options Список опций с id и label
 * @param allLabel Текст для опции "Все"
 * @returns Массив JSX-элементов Option
 */
const renderOptions = <T extends string>(
  options: { id: T; label: string }[],
  allLabel: string,
) => [
  <Option key="All" value="All">
    {allLabel}
  </Option>,
  ...options.map((opt) => (
    <Option key={opt.id} value={opt.id}>
      {opt.label}
    </Option>
  )),
];

/**
 * Компонент фильтров задач по категории, статусу и приоритету.
 * Значения синхронизированы с query-параметрами.
 */
export const TaskFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Обновляет query-параметр в URL.
   * @param key Название параметра
   * @param value Новое значение
   */
  const update = (key: string, value: string) => {
    const newParams = { ...Object.fromEntries(searchParams), [key]: value };
    setSearchParams(newParams);
  };

  const category = searchParams.get("category") || "All";
  const status = searchParams.get("status") || "All";
  const priority = searchParams.get("priority") || "All";

  return (
    <div className={styles.filtersRow}>
      <div className={styles.categoryUnderline}>
        <SelectField
          placeholder="Категория (все)"
          value={category}
          mode="select"
          onChange={(e) => update("category", e.target.value)}
        >
          {renderOptions(categoryOptions, "Категория (все)")}
        </SelectField>
      </div>

      <div className={styles.statusUnderline}>
        <SelectField
          placeholder="Статус (все)"
          value={status}
          mode="select"
          onChange={(e) => update("status", e.target.value)}
        >
          {renderOptions(statusOptions, "Статус (все)")}
        </SelectField>
      </div>

      <div className={styles.priorityUnderline}>
        <SelectField
          placeholder="Приоритет (все)"
          value={priority}
          mode="select"
          onChange={(e) => update("priority", e.target.value)}
        >
          {renderOptions(priorityOptions, "Приоритет (все)")}
        </SelectField>
      </div>
    </div>
  );
};
