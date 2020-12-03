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
} from './styles';
import { IProduct, useStock } from '../../hooks/stock';
import Loading from '../../components/Loading';

const Products: React.FC = () => {
  const [productsToShow, setProductsToShow] = useState<IProduct[]>([]);

  const { addToCart } = useCart();

  const { products, loading } = useStock();

  useEffect(() => {
    if (!loading) {
      const filteredProducts = products?.filter(
        product => product.quantity >= 1,
      );

      setProductsToShow(filteredProducts);
    }
  }, [loading, products]);

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
        {productsToShow?.map(product => (
          <Product key={product.id}>
            <ProductImage src={product.imageUrl} />
            <ProductTitle>{product.name}</ProductTitle>
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
