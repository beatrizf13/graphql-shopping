import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding: 20px;

  background: #0083ca;
  width: 100%;
  height: 8%;
  z-index: 100;

  span {
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }

  @media screen and (max-width: 488px) {
    flex-direction: column;
  }
`;

export const HeaderLinks = styled.ul`
  display: flex;
  padding-top: 10px;
`;

export const HeaderLink = styled.li`
  list-style: none;
  padding: 0 6px;

  a {
    color: #fff;
    text-decoration: none;

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
