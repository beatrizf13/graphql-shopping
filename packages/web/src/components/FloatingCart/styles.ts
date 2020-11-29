import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: sticky;
  top: 0;

  background: #0083ca;
  width: 100%;
  height: 8%;
  padding: 0 20px;
  z-index: 100;

  span {
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }

  @media screen and (max-width: 646px) {
    justify-content: center;
  }
`;

export const CartPricing = styled.div`
  padding: 20px;
`;

export const CartButton = styled.div`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  align-items: center;
  padding: 10px;

  span {
    margin-left: 15px;
    margin-right: auto;
  }
`;
