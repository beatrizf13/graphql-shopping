import React, { useCallback, useState, useEffect } from 'react';

import { FiPlus } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/cart';

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
  ProductQuantity,
} from './styles';
import { IProduct, useStock } from '../../hooks/stock';
import Loading from '../../components/Loading';

const Products: React.FC = () => {
  const { addToCart } = useCart();

  const { products, loading } = useStock();

  const handleAddToCart = useCallback(
    (product: IProduct) => {
      addToCart(product);
    },
    [addToCart],
  );

  if (loading) return <Loading />;

  return (
    <Container>
      <ProductList>
        {products?.map(product => (
          <Product opacity={product.quantity <= 0} key={product.id}>
            <ProductImage src={product.imageUrl} />
            <ProductTitle>{product.name}</ProductTitle>

            {product.quantity > 0 ? (
              <ProductQuantity>{`${product.quantity} ite${
                product.quantity > 1 ? 'ns' : 'm'
              } em estoque`}</ProductQuantity>
            ) : (
              <ProductQuantity>Fora de estoque</ProductQuantity>
            )}

            <PriceContainer>
              <ProductPrice>{formatValue(product.price)}</ProductPrice>
              <ProductButton onClick={() => handleAddToCart(product)}>
                <FiPlus size={20} color="#C4C4C4" />
              </ProductButton>
            </PriceContainer>
            <Link to={`/produto/${product.id}`}>Detalhes</Link>
          </Product>
        ))}
      </ProductList>
    </Container>
  );
};

export default Products;
