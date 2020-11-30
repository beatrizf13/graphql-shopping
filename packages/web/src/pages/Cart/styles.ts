import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EmptyCart = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

export const Checkout = styled.div`
  padding: 0.5rem;
  border-radius: 4px;
  width: 100%;
  max-width: 600px;
`;

export const CheckoutTotal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-size: 16px;

  span {
    margin-left: 2px;
    font-weight: bold;
  }
`;

export const ProductList = styled.div`
  padding: 0.5rem;
  width: 100%;
  max-width: 600px;
`;

export const Product = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 15px 10px;
  border-radius: 4px;
  margin: 4px;
`;

export const ProductImage = styled.img`
  height: 92px;
  width: 92px;
`;

export const ProductTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 14px;
  font-size: 16px;
`;

export const ProductTitle = styled.h3`
  font-size: 16px;
`;

export const ProductPriceContainer = styled.div``;

export const TotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
`;

export const ProductSinglePrice = styled.span`
  font-size: 12px;
  color: #a0a0b3;
  margin-top: 8px;
`;

export const ProductPrice = styled.span`
  font-weight: bold;
  margin-top: 5px;

  font-size: 16px;
  color: #0083ca;
`;

export const ProductQuantity = styled.span`
  font-size: 12px;
  color: #a0a0b3;
  margin-top: 8px;
  font-weight: bold;
  margin-right: 4px;
`;

export const ActionContainer = styled.div`
  align-self: flex-end;
  align-items: center;
  justify-content: space-between;

  margin-left: auto;
`;

export const ActionButton = styled.button`
  display: flex;
  background: #e7e7e7;
  border: none;

  border-radius: 4px;
  padding: 12px;
  margin-bottom: 4px;

  transition: background 0.4s ease 0s;

  &:hover {
    background: #c9d6e1;
  }
`;
