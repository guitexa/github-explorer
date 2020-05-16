import { createGlobalStyle } from 'styled-components';

import gitBg from '../assets/gitbg.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  body {
    background: #282a36 url(${gitBg}) no-repeat 90% top;
    background-size: 50%;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
    display: flex;
    justify-content: center;
  }

  button {
    cursor: pointer;
  }
`;
