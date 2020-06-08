import React, { createContext, useContext, useState, useCallback } from 'react';

interface LangState {
  lang: boolean;
}

interface LangContextData {
  language: boolean;
  switchLanguage(): void;
}

const LangContext = createContext<LangContextData>({} as LangContextData);

export const LangProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState<LangState>(() => {
    const lang = localStorage.getItem('@GithubExplorer: language');

    if (lang) {
      return { lang: JSON.parse(lang) };
    }

    return { lang: false };
  });

  const switchLanguage = useCallback(() => {
    if (!!language.lang) {
      localStorage.setItem('@GithubExplorer: language', 'false');
      setLanguage({ lang: false });
    } else {
      localStorage.setItem('@GithubExplorer: language', 'true');
      setLanguage({ lang: true });
    }
  }, [language.lang]);

  return (
    <LangContext.Provider value={{ language: language.lang, switchLanguage }}>
      {children}
    </LangContext.Provider>
  );
};

export function useLang() {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error('useLang must be within LangContext');
  }

  return context;
}
