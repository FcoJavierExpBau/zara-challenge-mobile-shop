import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./es.json";
import en from "./en.json";

// 📌 Leer el idioma desde el `.env`
const language = import.meta.env.VITE_LANG || "es"; // Por defecto, español

// 📌 Configurar i18next con archivos JSON
i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en }
    },
    lng: language,
    fallbackLng: "es",
    interpolation: { escapeValue: false }
  });

export default i18n;
