import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ThemeStore } from './hooks/ThemeContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeStore>
      <App />
    </ThemeStore>
  </React.StrictMode>,
  document.getElementById('root')
);
