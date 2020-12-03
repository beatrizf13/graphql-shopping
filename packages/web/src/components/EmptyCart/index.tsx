import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title';
import { Container, EmptyCartInfo } from './styles';

const EmptyCart: React.FC = () => (
  <Container>
    <EmptyCartInfo>
      <Title>Seu carrinho está vazio!</Title>
      <Link to="/produtos">Navegar entre os produtos</Link>
    </EmptyCartInfo>
  </Container>
);

export default EmptyCart;
