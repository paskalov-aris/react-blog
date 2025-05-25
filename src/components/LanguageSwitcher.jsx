import { useCallback, useEffect, useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("ua");

  const { i18n } = useTranslation();

  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <ListGroup horizontal>
      <ListGroup.Item>
        <Button
          variant={language === "ua" ? "primary" : "outline-primary"}
          onClick={() => handleLanguageChange("ua")}
        >
          UA
        </Button>
      </ListGroup.Item>
      <ListGroup.Item>
        <Button
          variant={language === "en" ? "primary" : "outline-primary"}
          onClick={() => handleLanguageChange("en")}
        >
          EN
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );
};
