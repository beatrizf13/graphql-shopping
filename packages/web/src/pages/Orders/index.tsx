import React, { useEffect } from 'react';

import Loading from '../../components/Loading';
import Title from '../../components/Title';
import { useAuth } from '../../hooks/auth';
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
  const { costumer } = useAuth();

  const { orders, getOrders, loading } = useOrder();

  useEffect(() => {
    getOrders({ variables: { costumerId: costumer?.id } });
  }, [costumer, getOrders]);

  if (loading) return <Loading />;

  return (
    <Container>
      <Title>
        {orders?.length > 0 ? 'Minhas compras' : 'Sem compras realizadas'}{' '}
      </Title>
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
