import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface RepositoryInfo {
  hasSwitchTheme: boolean;
}

interface IssuesProps {
  hasSwitchTheme: boolean;
}

export const Container = styled.section`
  width: 550px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    color: ${(props) => transparentize(0.5, `${props.theme.body.textColor}`)};

    &:hover {
      color: ${(props) => props.theme.body.textColor};
      svg {
        transform: translateX(-3px);
      }
    }

    svg {
      margin-right: 6px;
      transition: all 200ms ease-in-out;
    }
  }
`;

export const RepositoryInfo = styled.section<RepositoryInfo>`
  margin-top: 50px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 110px;
      height: 110px;
      border-radius: 50%;
    }

    div {
      flex: 1;
      margin-left: 30px;

      strong {
        color: ${({ hasSwitchTheme }) =>
          hasSwitchTheme
            ? (props) => props.theme.body.textColor
            : (props) => props.theme.body.green};
        font-size: 30px;
      }

      p {
        font-size: 18px;
        margin-top: 4px;
        color: #888;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 20px;

    li {
      display: block;

      & + li {
        margin-left: 80px;
      }

      strong {
        font-size: 28px;
        color: ${(props) => props.theme.body.textColor};
      }

      p {
        font-size: 15px;
        color: ${(props) =>
          transparentize(0.5, `${props.theme.body.textColor}`)};
      }
    }
  }
`;

export const Issues = styled.section<IssuesProps>`
  margin-top: 41px;
  max-width: 550px;

  a {
    background: ${({ hasSwitchTheme }) =>
      hasSwitchTheme ? '#f8f8f2' : 'transparent'};
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid
      ${({ hasSwitchTheme }) => (hasSwitchTheme ? 'transparent' : '#50fa7b')};
    color: ${({ hasSwitchTheme }) =>
      hasSwitchTheme
        ? (props) => props.theme.body.textColor
        : (props) => props.theme.body.green};
    transition: all 200ms ease-in-out;

    & + a {
      margin-top: 20px;
    }

    &:hover {
      ${(props) =>
        props.hasSwitchTheme === false &&
        css`
          box-shadow: 0 0 20px #50fa7b90;
        `};
      transform: translateX(10px);

      svg {
        opacity: 1;
      }
    }

    div {
      flex: 1;

      p {
        font-size: 14px;
        padding-top: 5px;
        color: #888;
      }
    }

    svg {
      margin-left: auto;
      color: ${({ hasSwitchTheme }) =>
        hasSwitchTheme
          ? (props) => props.theme.body.textColor
          : (props) => props.theme.body.green};
      opacity: 0.4;
      transition: all 200ms ease-in-out;
    }
  }
`;
