import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

export const Product = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 16px 10px;
  border-radius: 4px;
  margin: 4px;

  @media screen and (max-width: 712px) {
    flex-direction: column;
  }
`;

export const ProductImage = styled.img`
  object-fit: contain;
  align-self: center;
  height: 380px;
  width: 380px;
`;

export const ProductInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 32px;
  font-size: 16px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    max-width: 260px;
    background: #58c22e;

    svg {
      margin-right: 4px;
    }

    &:hover {
      background: ${shade(0.2, '#58c22e')};
    }
  }

  @media screen and (max-width: 712px) {
    margin-left: 0;
    margin-top: 32px;
  }
`;

export const ProductTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
`;

export const ProductDescription = styled.p`
  font-size: 14px;
  padding: 12px 0;
`;

export const ProductQuantity = styled.p`
  font-size: 12px;
  color: #a0a0b3;
`;

export const ProductPrice = styled.p`
  font-weight: bold;
  font-size: 26px;
  color: #0083ca;
`;
