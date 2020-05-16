import styled from 'styled-components';

export const Container = styled.div`
  width: 550px;
`;

export const Title = styled.h1`
  margin-top: 50px;
  color: #f8f8f2;
  width: 300px;
`;

export const Form = styled.form`
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

    &::placeholder {
      color: #f8f8f2;
    }

    &:focus {
      box-shadow: 0 0 20px #50fa7b90;
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
      transform: translateX(10px);
      box-shadow: 0 0 20px #50fa7b90;
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
    }
  }
`;
