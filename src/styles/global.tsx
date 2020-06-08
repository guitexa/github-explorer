import { createGlobalStyle } from 'styled-components';

import BackgroundDark from '../assets/background-dark.svg';
// import BackgroundLight from '../assets/background-light.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  body {
    background: #282a36 url(${BackgroundDark}) no-repeat 90% top fixed;
    background-size: 50%;
    -webkit-font-smoothing: antialiased;
    color: #f8f8f2;
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
