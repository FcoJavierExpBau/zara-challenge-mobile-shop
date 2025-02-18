import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PhoneProvider } from "./context/PhoneContext";
import App from "./App";
import "./locales/i18n";
import "./styles/main.css";

createRoot(document.getElementById("root")!).render(
  // ❌ Quitamos StrictMode TEMPORALMENTE
  <PhoneProvider>
    <BrowserRouter future={{ 
      v7_relativeSplatPath: true, 
      v7_startTransition: true 
    }}>
      <App />
    </BrowserRouter>
  </PhoneProvider>
);
