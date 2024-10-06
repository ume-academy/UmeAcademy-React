import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./sass/index.scss";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./contexts/ThemeContext.tsx";
import { ModeProvider } from "./contexts/ModeUser.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ModeProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      </ModeProvider>
    </BrowserRouter>
  </StrictMode>
);
