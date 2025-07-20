import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import {
  LIGHT_THEME,
  DropdownProvider,
  FontsVTBGroup,
} from "@admiral-ds/react-ui";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "@app/providers/routing/AppRouter";
import { StoreProvider } from "./providers/StoreProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={LIGHT_THEME}>
      <DropdownProvider>
        <FontsVTBGroup />
        <StoreProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </StoreProvider>
      </DropdownProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
