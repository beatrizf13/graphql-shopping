import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { GET_ORDERS, CREATE_ORDER } from '../graphql/order';
import { IProduct } from './stock';
import { useAuth } from './auth';

export interface ICreateOrderItem {
  productId: string;
  quantity: number;
}

interface ICreateOrder {
  costumerId: string;
  creditCard: string;
  items: ICreateOrderItem[];
}

interface IOrderItem {
  id: string;
  product: IProduct;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: string;
  items: IOrderItem[];
  totalPrice: number;
  createdAt: Date;
}

interface IOrderContext {
  loading: boolean;
  orders: IOrder[];
  createOrder(data: ICreateOrder): Promise<IOrder>;
}

const OrderContext = createContext<IOrderContext>({} as IOrderContext);

export const OrderProvider: React.FC = ({ children }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [createOrderRequest] = useMutation(CREATE_ORDER);

  const { costumer } = useAuth();

  const { loading, data: getOrdersResponse } = useQuery(GET_ORDERS, {
    variables: { costumerId: costumer?.id },
  });

  useEffect(() => {
    if (!loading) {
      setOrders(getOrdersResponse?.ordersByCostumer);
    }
  }, [loading, getOrdersResponse]);

  const createOrder = useCallback(
    async (data: ICreateOrder): Promise<IOrder> => {
      const response = await createOrderRequest({ variables: data });

      const order = response.data.createOrder;

      return order;
    },
    [createOrderRequest],
  );

  const value = React.useMemo(
    () => ({
      loading,
      orders,
      createOrder,
    }),
    [createOrder, loading, orders],
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export function useOrder(): IOrderContext {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('useOrder must be used within a OrderProvider');
  }

  return context;
}
