import React, { createContext, useContext, useState, useCallback } from 'react';

interface ThemeState {
  theme: boolean;
}

interface ThemeContextData {
  theme: boolean;
  switchTheme(): void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeStore: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeState>(() => {
    const theme = localStorage.getItem('@GithubExplorer: theme');

    if (theme) {
      return { theme: JSON.parse(theme) };
    }

    return { theme: false };
  });

  const switchTheme = useCallback(() => {
    if (!!theme.theme) {
      localStorage.setItem('@GithubExplorer: theme', 'false');
      setTheme({ theme: false });
    } else {
      localStorage.setItem('@GithubExplorer: theme', 'true');
      setTheme({ theme: true });
    }
  }, [theme.theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme.theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be within ThemeContext');
  }

  return context;
}
