import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "locales/en.json";
import zh from "locales/zh.json";

i18next
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    react: {
      useSuspense: true,
    },
    fallbackLng: "en",
    preload: ["en", "zh"],
    interpolation: { escapeValue: false },
  });

export default i18next;
