import React, { useCallback } from 'react';
import { FiPlus, FiMinus, FiTrash } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import {
  Container,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  Checkout,
  CheckoutTotal,
} from './styles';

import { useCart } from '../../hooks/cart';
import { formatValue } from '../../utils/formatValue';

import Button from '../../components/Button';
import EmptyCart from '../../components/EmptyCart';

const Cart: React.FC = () => {
  const { increment, decrement, products, totalValue, totalItens } = useCart();

  const handleIncrement = useCallback(
    (productId: string) => {
      increment(productId);
    },
    [increment],
  );

  const handleDecrement = useCallback(
    (productId: string) => {
      decrement(productId);
    },
    [decrement],
  );

  if (products.length < 1) {
    return <EmptyCart />;
  }

  return (
    <Container>
      <ProductList>
        {products.map(product => (
          <Product key={product.id}>
            <ProductImage src={product.imageUrl} />
            <ProductTitleContainer>
              <ProductTitle>{product.name}</ProductTitle>

              <ProductPriceContainer>
                <ProductQuantity>{`${product.quantity}x`}</ProductQuantity>
                <ProductSinglePrice>
                  {formatValue(product.price)}
                </ProductSinglePrice>

                <TotalContainer>
                  <ProductPrice>
                    {formatValue(product.price * product.quantity)}
                  </ProductPrice>
                </TotalContainer>
              </ProductPriceContainer>
            </ProductTitleContainer>

            <ActionContainer>
              <ActionButton onClick={() => handleIncrement(product.id)}>
                <FiPlus size={20} color="#636363" />
              </ActionButton>
              <ActionButton onClick={() => handleDecrement(product.id)}>
                {product.quantity <= 1 ? (
                  <FiTrash size={20} color="#636363" />
                ) : (
                  <FiMinus size={20} color="#636363" />
                )}
              </ActionButton>
            </ActionContainer>
          </Product>
        ))}
      </ProductList>

      <Checkout>
        <CheckoutTotal>
          <p>{`Total (${totalItens} ite${totalItens > 1 ? 'ns' : 'm'})`}</p>
          <span>{totalValue}</span>
        </CheckoutTotal>

        <Link to="/pagamento">
          <Button>Continuar</Button>
        </Link>
      </Checkout>
    </Container>
  );
};

export default Cart;
