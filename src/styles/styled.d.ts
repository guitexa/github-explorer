import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    body: {
      textColor: string;
      background: string;
      green: string;
    };

    button: {
      textColor: string;
    };
  }
}
