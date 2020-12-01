import { useQuery } from '@apollo/client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { GET_PRODUCTS } from '../graphql/stock';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface IStockContext {
  products: IProduct[];
}

const StockContext = createContext<IStockContext | null>(null);

export const StockProvider: React.FC = ({ children }) => {
  const { loading, data: response } = useQuery(GET_PRODUCTS);

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (!loading) {
      setProducts(response?.products);
    }
  }, [loading, response]);

  const value = React.useMemo(() => ({ products }), [products]);

  return (
    <StockContext.Provider value={value}>{children}</StockContext.Provider>
  );
};

export function useStock(): IStockContext {
  const context = useContext(StockContext);

  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }

  return context;
}
