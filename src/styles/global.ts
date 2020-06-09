import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  html {
    overflow-y:scroll;
  }

  body {
    background: ${(props) =>
      props.theme.body.background} no-repeat 90% top fixed;
    background-size: 50%;
    -webkit-font-smoothing: antialiased;
    color: ${(props) => props.theme.body.textColor};
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
