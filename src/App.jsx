import "./App.css";
import { CategoriesProvider } from "./components/CategoriesProvider";
import { Main } from "./components/Main";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ua from "./locales/ua.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ua: {
      translation: ua,
    },
  },
  lng: "ua",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  return (
    <CategoriesProvider>
      <Main />
    </CategoriesProvider>
  );
}

export default App;
