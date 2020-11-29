import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductList = styled.div`
  padding: 0.5rem;
  width: 100%;
  max-width: 1080px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  gap: 0.5rem;
`;

export const Product = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-self: center;

  background: #fff;
  padding: 16px 16px;
  border-radius: 5px;
  margin: 8px;

  &:hover {
    box-shadow: rgb(0 0 0 / 15%) 0px 0px 20px;
  }

  transition: box-shadow 0.4s ease 0s;
`;

export const ProductImage = styled.img`
  align-self: center;
  height: 122px;
  width: 122px;
  object-fit: contain;
`;

export const ProductTitle = styled.h3`
  font-size: 16px;
  line-height: 18px;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-size: 16px;
  font-weight: bold;

  padding-top: 10px;
  margin-top: auto;
`;

export const ProductPrice = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #0083ca;
`;

export const ProductButton = styled.button`
  background: none;
  border: none;
`;
