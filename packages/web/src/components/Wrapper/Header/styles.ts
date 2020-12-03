import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding: 10px;

  background: #0083ca;
  width: 100%;
  height: 40px;
  z-index: 100;

  span {
    color: #fff;
    font-weight: bold;
  }

  @media screen and (max-width: 512px) {
    height: 72px;
    flex-direction: column;
  }
`;

export const HeaderLinks = styled.ul`
  display: flex;

  @media screen and (max-width: 512px) {
    margin-bottom: 12px;
  }
`;

export const HeaderLink = styled.li`
  list-style: none;
  padding: 0 6px;

  a {
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
  }

  a,
  button {
    color: #fff;
    border-bottom: 1px solid #0083ca;

    &:hover {
      border-bottom: 1px solid #fff;
    }
  }
`;

export const Cart = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const CartPricing = styled.div`
  padding: 0 20px;
`;

export const CartButton = styled.div`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  align-items: center;
  padding: 0 10px;

  span {
    margin-left: 15px;
    margin-right: auto;
  }
`;
