import { useQuery } from '@apollo/client';
import React, { useState, useEffect, useCallback } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import {
  Container,
  Product,
  ProductImage,
  ProductInfoContainer,
  ProductTitle,
  ProductQuantity,
  ProductPrice,
  ProductDescription,
} from './styles';

import { IProduct } from '../../hooks/stock';
import { SHOW_PRODUCT } from '../../graphql/stock';
import Loading from '../../components/Loading';
import { formatValue } from '../../utils/formatValue';
import Button from '../../components/Button';
import { useCart } from '../../hooks/cart';

interface IProductDetailsParams {
  id: string;
}

const ProductDetails: React.FC = () => {
  const [product, setProduct] = useState<IProduct>();

  const { addToCart } = useCart();

  const { id } = useParams<IProductDetailsParams>();

  const { loading, data: response } = useQuery(SHOW_PRODUCT, {
    variables: { id },
  });

  useEffect(() => {
    if (!loading) {
      setProduct(response?.product);
    }
  }, [loading, response]);

  const handleAddToCart = useCallback(
    (productToAdd: IProduct) => {
      addToCart(productToAdd);
    },
    [addToCart],
  );

  if (loading) return <Loading />;
  if (!product) return <h1>Produto não encontrado</h1>;

  return (
    <Container>
      <Product>
        <ProductImage src={product.imageUrl} />

        <ProductInfoContainer>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductQuantity>{`${product.quantity} ite${
            product.quantity > 1 ? 'ns' : 'm'
          } em estoque`}</ProductQuantity>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>{formatValue(product.price)}</ProductPrice>
          <Button onClick={() => handleAddToCart(product)}>
            <FiShoppingBag size={18} color="#fff" /> Adicionar ao carrinho
          </Button>
        </ProductInfoContainer>
      </Product>
    </Container>
  );
};

export default ProductDetails;
