import React from 'react';
import Loading from '../../components/Loading';
import Title from '../../components/Title';
import { useOrder } from '../../hooks/order';
import { formatDate } from '../../utils/formatDate';
import { formatValue } from '../../utils/formatValue';
import {
  Container,
  Order,
  OrderItem,
  ProductInfo,
  ProductTotal,
  OrderTotal,
} from './styles';

const Orders: React.FC = () => {
  const { orders, loading } = useOrder();

  if (loading) return <Loading />;

  if (orders?.length < 0) return <h2>Sem compras...</h2>;

  return (
    <Container>
      <Title>Minhas compras</Title>
      {orders?.map(order => (
        <Order key={order.id}>
          <h3>Compra de {formatDate(new Date(order.createdAt))}</h3>
          {order.items.map(item => (
            <OrderItem key={item.id}>
              <ProductInfo>{`${item.quantity}x ${item.product.name}`}</ProductInfo>

              <ProductTotal>
                {formatValue(item.price * item.quantity)}
              </ProductTotal>
            </OrderItem>
          ))}

          <hr />

          <OrderTotal>Total {formatValue(order.totalPrice)}</OrderTotal>
        </Order>
      ))}
    </Container>
  );
};

export default Orders;
