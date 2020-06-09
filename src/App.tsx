import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { LangProvider } from './hooks/LangContext';
import { useTheme } from './hooks/ThemeContext';
import dark from './styles/themes/dark';
import light from './styles/themes/light';
import GlobalStyle from './styles/global';
import Routes from './routes';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme === 'dark' ? dark : light}>
          <LangProvider>
            <Routes />
          </LangProvider>
          <GlobalStyle />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
