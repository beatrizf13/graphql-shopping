import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  flex-direction: column;
`;

export const Order = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 16px 10px;
  border-radius: 4px;
  margin: 4px;

  hr {
    margin: 12px 0;
  }

  h3 {
    margin-bottom: 12px;
    font-weight: bold;
  }
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
`;
export const ProductInfo = styled.span``;

export const ProductTotal = styled.span``;

export const OrderTotal = styled.span`
  text-align: end;
  font-weight: bold;
`;
