import React, { createContext, useContext, useState, useCallback } from 'react';

interface ThemeState {
  theme: string;
}

interface ThemeContextData {
  theme: string;
  switchTheme(): void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeStore: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeState>(() => {
    const theme = localStorage.getItem('@GithubExplorer: theme');

    if (theme) {
      return { theme };
    }

    return { theme: 'dark' };
  });

  const switchTheme = useCallback(() => {
    if (theme.theme === 'light') {
      localStorage.setItem('@GithubExplorer: theme', 'dark');
      setTheme({ theme: 'dark' });
    } else {
      localStorage.setItem('@GithubExplorer: theme', 'light');
      setTheme({ theme: 'light' });
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
