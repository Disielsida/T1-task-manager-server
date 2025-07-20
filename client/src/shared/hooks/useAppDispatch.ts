import { useDispatch } from "react-redux";
import type { AppDispatch } from "@app/store";

/**
 * Хук-обёртка над useDispatch с типом AppDispatch.
 * Обеспечивает корректную типизацию при отправке действий.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
