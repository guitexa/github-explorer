import styled, { css } from 'styled-components';

interface FormProps {
  hasError: boolean;
}

export const Container = styled.div`
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

  a {
    background: transparent;
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #50fa7b;
    color: #50fa7b;
    transition: all 200ms ease-in-out;

    & + a {
      margin-top: 20px;
    }

    &:hover {
      box-shadow: 0 0 20px #50fa7b90;
      transform: translateX(10px);

      svg {
      opacity: 1;
      }
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    div {
      margin: 0 20px;
      flex: 1;

      p {
        font-size: 14px;
        padding-top: 5px;
        color: #f8f8f290;
      }
    }

    svg {
      margin-left: auto;
      color: #50fa7b;
      opacity: 0.6;
      transition: all 200ms ease-in-out;
    }
  }
`;
