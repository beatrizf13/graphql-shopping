import React, { useMemo } from 'react';

import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, CartPricing, CartButton } from './styles';

import { useCart } from '../../hooks/cart';
import { formatValue } from '../../utils/formatValue';
import { IProduct } from '../../hooks/stock';

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const cartTotal = useMemo(() => {
    const total = products.reduce((accumulator, product) => {
      const productTotal = product.price * product.quantity;

      return accumulator + productTotal;
    }, 0);

    return formatValue(total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const total = products.reduce(
      (accumulator: number, product: IProduct) => accumulator + product.quantity,
      0,
    );

    return total;
  }, [products]);

  return (
    <Container>
      <CartPricing>
        <span>{cartTotal}</span>
      </CartPricing>

      <Link to="#cart">
        <CartButton>
          <FiShoppingCart size={24} color="#fff" />
          <span>{`${totalItensInCart} itens`}</span>
        </CartButton>
      </Link>
    </Container>
  );
};

export default FloatingCart;
