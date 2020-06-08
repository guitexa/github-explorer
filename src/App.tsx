import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LangProvider } from './hooks/LangContext';
import { ThemeStore } from './hooks/ThemeContext';
import GlobalStyle from './styles/global';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <ThemeStore>
        <LangProvider>
          <Routes />
        </LangProvider>
        <GlobalStyle />
      </ThemeStore>
    </BrowserRouter>
  </>
);

export default App;
