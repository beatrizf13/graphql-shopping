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

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 260px;

    svg {
      margin-right: 4px;
    }
  }

  @media screen and (max-width: 712px) {
    margin-left: 0;
    margin-top: 32px;
  }
`;

export const ProductTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
`;

export const ProductDescription = styled.p`
  padding: 12px 0;
`;

export const ProductQuantity = styled.p`
  font-size: 12px;
  color: #a0a0b3;
`;

export const ProductPrice = styled.p`
  font-weight: bold;
  font-size: 22px;
  color: #0083ca;
`;
