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
  items: IOrderItem[];
  createdAt: Date;
}

interface IOrderContext {
  orders: IOrder[];
  createOrder(data: ICreateOrder): Promise<IOrder>;
}

const OrderContext = createContext<IOrderContext>({} as IOrderContext);

export const OrderProvider: React.FC = ({ children }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [createOrderRequest] = useMutation(CREATE_ORDER);

  const { loading, data: getOrdersResponse } = useQuery(GET_ORDERS);

  useEffect(() => {
    if (!loading) {
      setOrders(getOrdersResponse?.orders);
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
      orders,
      createOrder,
    }),
    [createOrder, orders],
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
