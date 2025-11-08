import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./language/english.json";
import sv from "./language/swedish.json";

i18n
  .use(initReactI18next)
  .init({
    resources:{
      en: { translation: en },
      sv: { translation: sv },
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation:{
      escapeValue: false,
    },
  });

export default i18n;
