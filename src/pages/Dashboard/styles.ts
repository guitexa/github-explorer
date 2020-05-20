import styled, { css } from 'styled-components';

interface FormProps {
  hasError: boolean;
}
interface ConfirmProps {
  hasConfirmed: boolean;
}

export const Container = styled.section`
  width: 550px;
`;

export const Title = styled.h1`
  margin-top: 50px;
  color: #f8f8f2;
  width: 300px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 30px;
  display: flex;
  max-width: 550px;

  input {
    flex: 1;
    padding: 18px 17px;
    border: 1px solid #50fa7b;
    border-radius: 5px 0 0 5px;
    background: transparent;
    color: #f8f8f2;
    transition: all 200ms ease-in-out;

    &:focus {
      box-shadow: 0 0 20px ${({ hasError }) => (hasError ? '#ff555590' : '#50fa7b90' )};
    }

    ${(props) =>
      props.hasError &&
      css`
        border-color: #ff5555;
        border-right: none;
        box-shadow: 0 0 20px #ff555590;
    `}

    &::placeholder {
      color: #f8f8f2;
    }

  }

  button {
    padding: 0 45px;
    border: 0;
    border-radius: 0 5px 5px 0;
    background: #50fa7b;
    color: #282a36;
    font-size: 17px;
    font-weight: bold;
    transition: all 200ms ease-in-out;

    &:hover {
    box-shadow: 0 0 20px #50fa7b90;
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

export const Repository = styled.div<ConfirmProps>`
  transition: all 200ms ease-in-out;
    ${(props) =>
      props.hasConfirmed &&
      css`
        box-shadow: 0 0 10px #ff555580;
      `}

  & + div {
      margin-top: 20px;
    }

  &:hover {
    box-shadow: 0 0 20px ${({ hasConfirmed }) => (hasConfirmed ? '#ff555590' : '#50fa7b90' )};
    transform: translateX(5px);

    a {
      svg {
        opacity: ${({ hasConfirmed }) => (hasConfirmed ? '0.2' : '1' )};
      }
    }

  }

  a {
    background: ${({ hasConfirmed }) => (hasConfirmed ? '#ff555510' : 'transparent' )};
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid ${({ hasConfirmed }) => (hasConfirmed ? '#ff5555' : '#50fa7b' )};
    color: ${({ hasConfirmed }) => (hasConfirmed ? '#ff5555' : '#50fa7b' )};
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
      opacity: ${({ hasConfirmed }) => (hasConfirmed ? '0.4' : '1' )};

      p {
        font-size: 14px;
        padding-top: 5px;
        color: #f8f8f290;
      }
    }

    svg {
      margin-left: auto;
      color: ${({ hasConfirmed }) => (hasConfirmed ? '#ff5555' : '#50fa7b' )};
      opacity: ${({ hasConfirmed }) => (hasConfirmed ? '0.2' : '0.4' )};
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
    color: #f8f8f2;
    opacity: 0.3;
    margin-left: 0;

    &:hover {
      opacity: 1;
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
    color: #ff5555;
    margin-left: 0;
  }
}
`;
