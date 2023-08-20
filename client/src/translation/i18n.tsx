import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import translationEnglish from "./english/translation.json";
import translationUkrainian from "./ukrainian/translation.json";

const resources = {
  en: {
    translation: translationEnglish,
  },
  uk: {
    translation: translationUkrainian,
  },
};

void i18next.use(initReactI18next).init({
  resources,
  lng: "en",
});

export default i18next;
