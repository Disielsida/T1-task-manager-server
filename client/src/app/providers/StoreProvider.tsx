import { Provider } from "react-redux";
import { store } from "../store";
import React from "react";

/**
 * Обёртка для подключения Redux store ко всему приложению.
 * Используется на верхнем уровне, чтобы обеспечить доступ к хранилищу.
 */
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
