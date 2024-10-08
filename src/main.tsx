import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./sass/index.scss";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./contexts/ThemeContext";
import { ModeProvider } from "./contexts/ModeUser";

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
