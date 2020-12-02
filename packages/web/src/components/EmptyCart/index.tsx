import React from 'react';
import { Link } from 'react-router-dom';
import { Container, EmptyCartInfo } from './styles';

const EmptyCart: React.FC = () => (
  <Container>
    <EmptyCartInfo>
      <h2>Seu carrinho está vazio!</h2>
      <Link to="/produtos">Navegar entre os produtos</Link>
    </EmptyCartInfo>
  </Container>
);

export default EmptyCart;
