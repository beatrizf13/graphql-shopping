import React from 'react';

import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  Cart,
  CartPricing,
  CartButton,
  HeaderLinks,
  HeaderLink,
} from './styles';

import { useCart } from '../../../hooks/cart';
import { useAuth } from '../../../hooks/auth';

const Header: React.FC = () => {
  const { signOut } = useAuth();
  const { totalValue, totalItens } = useCart();

  const handleSignOut = (): void => signOut();

  return (
    <Container>
      <HeaderLinks>
        <HeaderLink>
          <Link to="/compras">Minhas compras</Link>
        </HeaderLink>

        <HeaderLink>
          <Link to="/produtos">Produtos</Link>
        </HeaderLink>

        <HeaderLink>
          <button type="button" onClick={handleSignOut}>
            Sair
          </button>
        </HeaderLink>
      </HeaderLinks>

      {totalItens >= 1 && (
        <Cart>
          <CartPricing>
            <span>{totalValue}</span>
          </CartPricing>

          <Link to="/carrinho">
            <CartButton>
              <FiShoppingCart size={24} color="#fff" />
              <span>{`${totalItens} ite${totalItens > 1 ? 'ns' : 'm'}`}</span>
            </CartButton>
          </Link>
        </Cart>
      )}
    </Container>
  );
};

export default Header;
