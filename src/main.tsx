import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PhoneProvider } from "./context/PhoneContext";
import App from "./App.tsx";
import "./i18n"; // 📌 Importar la configuración de i18n

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PhoneProvider>
      <BrowserRouter future={{ 
        v7_relativeSplatPath: true, 
        v7_startTransition: true 
      }}>
        <App />
      </BrowserRouter>
    </PhoneProvider>
  </StrictMode>
);
