import styled, { css } from 'styled-components';
import { transparentize, shade } from 'polished';

interface FormProps {
  hasError: boolean;
  hasSwitchTheme: boolean;
}

interface HeaderProps {
  hasSwitchTheme: boolean;
  hasSwitchLanguage: boolean;
}

interface RepositoryProps {
  hasSwitchTheme: boolean;
  hasConfirmed: boolean;
}

export const Container = styled.section`
  width: 550px;
`;

export const Header = styled.header<HeaderProps>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  #settings {
    display: flex;
    justify-content: flex-end;
    padding: 0 0 10px 50px;

    &:hover {
      & > button > svg {
        transform: rotate(-30deg);
      }

      #menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(10px);
      }
    }

    button {
      display: flex;
      background-color: transparent;
      justify-content: flex-end;
      cursor: pointer;
      border: 0;
      outline: none;

      svg:nth-child(1) {
        color: ${(props) => props.theme.body.textColor};
      }

      svg {
        z-index: 1000;
        transition: transform 200ms ease-in-out;
      }
    }

    #menu {
      display: flex;
      opacity: 0;
      position: absolute;
      visibility: hidden;
      margin-top: 20px;
      flex-direction: column;
      transition: all 200ms ease-in-out;

      button {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        margin: 5px;
        cursor: pointer;
        outline: none;
        border-radius: 5px;
        transition: all 200ms ease-in-out;
        background-color: transparent;
        border: 1px solid #50fa7b;
        ${(props) =>
          props.hasSwitchTheme &&
          css`
            background-color: #f8f8f2;
            border: 1px solid transparent;
          `};

        /* Dark Icon */
        svg:nth-child(1) {
          color: ${({ hasSwitchTheme }) =>
            hasSwitchTheme
              ? (props) => transparentize(0.6, `${props.theme.body.textColor}`)
              : (props) => props.theme.body.textColor};
        }

        /* Bright Icon */
        svg:nth-child(3) {
          color: ${({ hasSwitchTheme }) =>
            hasSwitchTheme
              ? (props) => props.theme.body.textColor
              : (props) =>
                  transparentize(0.5, `${props.theme.body.textColor}`)};
        }

        /* Dark Icon */
        img:nth-child(1) {
          opacity: ${({ hasSwitchLanguage }) =>
            hasSwitchLanguage ? '0.5' : '1'};
        }

        /* Bright Icon */
        img:nth-child(3) {
          opacity: ${({ hasSwitchLanguage }) =>
            hasSwitchLanguage ? '1' : '0.5'};
        }

        &:hover {
          box-shadow: 0 0 20px #50fa7b90;
          ${(props) =>
            props.hasSwitchTheme &&
            css`
              box-shadow: none;
            `};
        }

        .MuiSwitch-switchBase.Mui-checked {
          transform: translateX(21px);
        }

        .MuiSwitch-colorSecondary.Mui-checked {
          color: transparent;
        }

        .MuiSwitch-root {
          width: 45px;
          margin: 0 10px;
          display: flex;
          align-items: center;

          .MuiIconButton-label {
            color: ${(props) => props.theme.body.green};

            &:hover {
              ${(props) =>
                props.hasSwitchTheme &&
                css`
                  color: ${(props) => shade(0.2, `${props.theme.body.green}`)};
                `};
            }
          }

          .MuiSwitch-track {
            background-color: ${({ hasSwitchTheme }) =>
              hasSwitchTheme ? '#ddd' : '#000'};
            opacity: 1;
          }
        }

        svg {
          & + svg {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

export const Title = styled.h1`
  margin-top: 50px;
  width: 240px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 30px;
  display: flex;
  max-width: 550px;

  input {
    flex: 1;
    padding: 18px 17px;
    border: 1px solid
      ${({ hasSwitchTheme }) =>
        hasSwitchTheme ? 'transparent' : (props) => props.theme.body.green};
    border-radius: 5px 0 0 5px;
    background: ${({ hasSwitchTheme }) =>
      hasSwitchTheme ? '#f8f8f2' : 'transparent'};
    color: ${(props) => props.theme.body.textColor};
    transition: all 200ms ease-in-out;

    &:focus {
      ${(props) =>
        props.hasSwitchTheme === false &&
        css`
          box-shadow: 0 0 20px #50fa7b90;
        `};
      ${(props) =>
        props.hasSwitchTheme === false &&
        props.hasError &&
        css`
          box-shadow: 0 0 20px #ff555590;
        `};
    }

    ${(props) =>
      props.hasError &&
      css`
        border-color: #ff5555;
        border-right: none;
      `}

    ${(props) =>
      props.hasSwitchTheme === false &&
      props.hasError &&
      css`
        box-shadow: 0 0 20px #ff555590;
      `}

    &::placeholder {
      color: ${(props) => transparentize(0.4, `${props.theme.body.textColor}`)};
    }
  }

  button {
    padding: 0 45px;
    border: 0;
    border-radius: 0 5px 5px 0;
    background: ${(props) => props.theme.body.green};
    color: ${(props) => props.theme.button.textColor};
    font-size: 17px;
    font-weight: bold;
    transition: all 200ms ease-in-out;

    &:hover {
      background: ${({ hasSwitchTheme }) =>
        hasSwitchTheme
          ? (props) => shade(0.2, `${props.theme.body.green}`)
          : null};
      ${(props) =>
        props.hasSwitchTheme === false &&
        css`
          box-shadow: 0 0 20px #50fa7b90;
        `};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #ff5555;
  margin-top: 7px;
  font-size: 14px;
`;

export const Repositories = styled.div`
  margin-top: 50px;
  max-width: 550px;
`;

export const Repository = styled.div<RepositoryProps>`
  transition: all 200ms ease-in-out;
  ${(props) =>
    props.hasConfirmed &&
    props.hasSwitchTheme === false &&
    css`
      box-shadow: 0 0 10px #ff555580;
    `}

  & + div {
    margin-top: 20px;
  }

  &:hover {
    box-shadow: 0 0 20px
      ${({ hasConfirmed, hasSwitchTheme }) =>
        hasConfirmed && hasSwitchTheme === false
          ? '#ff555590'
          : hasSwitchTheme === false
          ? '#50fa7b90'
          : 'transparent'};
    transform: translateX(5px);

    a {
      svg {
        opacity: ${({ hasConfirmed }) => (hasConfirmed ? '0.2' : '1')};
      }
    }
  }

  a {
    background: ${({ hasConfirmed, hasSwitchTheme }) =>
      hasConfirmed && hasSwitchTheme === false
        ? '#ff555510'
        : hasConfirmed && hasSwitchTheme
        ? '#ff555530'
        : hasSwitchTheme
        ? '#f8f8f2'
        : 'transparent'};
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid
      ${({ hasConfirmed, hasSwitchTheme }) =>
        hasConfirmed && hasSwitchTheme === false
          ? '#ff5555'
          : hasConfirmed && hasSwitchTheme
          ? '#ff555560'
          : hasSwitchTheme === false
          ? '#50fa7b'
          : 'transparent'};
    color: ${({ hasConfirmed, hasSwitchTheme }) =>
      hasConfirmed && hasSwitchTheme === false
        ? '#ff5555'
        : hasSwitchTheme === false
        ? '#50fa7b'
        : (props) => props.theme.body.textColor};
    transition: all 200ms ease-in-out;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      ${(props) =>
        props.hasConfirmed &&
        css`
          z-index: -1000;
          opacity: 0.5;
          filter: blur(1px) grayscale(1);
        `}
    }

    div {
      margin: 0 20px;
      flex: 1;
      opacity: ${({ hasConfirmed }) => (hasConfirmed ? '0.4' : '1')};

      p {
        font-size: 14px;
        padding-top: 5px;
        color: #888;
      }
    }

    svg {
      margin-left: auto;
      color: ${({ hasConfirmed, hasSwitchTheme }) =>
        hasConfirmed
          ? '#ff5555'
          : hasSwitchTheme
          ? (props) => props.theme.body.textColor
          : (props) => props.theme.body.green};
      opacity: ${({ hasConfirmed }) => (hasConfirmed ? '0.2' : '0.4')};
      transition: all 200ms ease-in-out;
    }
  }

  .unconfirmed {
    z-index: 1000;
    display: flex;
    align-self: end;
    position: absolute;
    margin-top: 3px;
    margin-left: 3px;
    width: 25px;
    height: 25px;
    background-color: transparent;
    border: none;
    transition: all 200ms ease-in-out;

    svg {
      color: #888;
      margin-left: 0;
      transition: all 200ms ease-in-out;

      &:hover {
        color: ${(props) => props.theme.body.textColor};
      }
    }
  }

  .confirmed {
    z-index: 1000;
    display: flex;
    align-self: end;
    position: absolute;
    margin-top: 3px;
    margin-left: 3px;
    width: 25px;
    height: 25px;
    background-color: transparent;
    border: none;
    transition: all 200ms ease-in-out;

    svg {
      color: ${({ hasSwitchTheme }) =>
        hasSwitchTheme ? '#ff5555' : '#ff5555'};
      margin-left: 0;
    }
  }
`;
