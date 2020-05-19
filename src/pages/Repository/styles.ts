import styled from 'styled-components';

export const Container = styled.section`
  width: 550px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    color: #f8f8f290;

    &:hover {
    color: #f8f8f2;
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

export const RepositoryInfo = styled.section`
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
      margin-left: 30px;

      strong {
        color: #50fa7b;
        font-size: 30px;
      }

      p {
        font-size: 18px;
        margin-top: 4px;
        color: #f8f8f290;
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
        color: #f8f8f2;
      }

      p {
        font-size: 15px;
        color: #f8f8f290;
      }
    }
  }

`;

export const Issues = styled.section`
  margin-top: 41px;
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

    div {
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
      opacity: 0.4;
      transition: all 200ms ease-in-out;
    }
  }
`;
