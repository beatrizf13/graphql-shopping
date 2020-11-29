import React from 'react';

import { FiPlus } from 'react-icons/fi';

import { useCart } from '../../hooks/cart';

import FloatingCart from '../../components/FloatingCart';

import { formatValue } from '../../utils/formatValue';

import {
  Container,
  ProductImage,
  ProductList,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
} from './styles';
import { IProduct, useStock } from '../../hooks/stock';

const Products: React.FC = () => {
  const { addToCart } = useCart();

  const { products } = useStock();

  function handleAddToCart(product: IProduct): void {
    addToCart(product);
  }

  return (
    <>
      <FloatingCart />
      <Container>

        <ProductList>
          {products?.map((product) => (
            <Product key={product.id}>
              <ProductImage src={product.imageUrl} />
              <ProductTitle>{product.name}</ProductTitle>
              <PriceContainer>
                <ProductPrice>{formatValue(product.price)}</ProductPrice>
                <ProductButton onClick={() => handleAddToCart(product)}>
                  <FiPlus size={20} color="#C4C4C4" />
                </ProductButton>
              </PriceContainer>
            </Product>
          ))}
        </ProductList>
      </Container>
    </>
  );
};

export default Products;
