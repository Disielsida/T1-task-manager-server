import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "@app/store";

/**
 * Типизированный useSelector для получения данных из Redux-стора.
 * Использует RootState для обеспечения автодополнения и проверки типов.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
