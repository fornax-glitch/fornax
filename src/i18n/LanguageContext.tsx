import { createContext, useContext, useState, useEffect } from "react";
import en from "../i18n/en";
import fr from "../i18n/fr";

type Language = "en" | "fr";

const translations: Record<Language, any> = {
  en,
  fr,
};

type ContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
};

const LanguageContext = createContext<ContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {

  // ✅ DEFAULT = FRENCH (IMPORTANT FOR MOROCCO + SEO)
  const getInitialLang = (): Language => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved === "en" || saved === "fr") return saved;
    return "fr"; // 👈 DEFAULT LANGUAGE
  };

  const [lang, setLang] = useState<Language>(getInitialLang);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};