import { useQuery } from '@apollo/client';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import { GET_PRODUCTS } from '../graphql/stock';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface IHasQuantityOnStock {
  productId: string;
  quantity: number;
}

interface IStockContext {
  loading: boolean;
  products: IProduct[];
  hasQuantityOnStock(options: IHasQuantityOnStock): boolean;
  updateProducts(): Promise<void>;
}

const StockContext = createContext<IStockContext | null>(null);

export const StockProvider: React.FC = ({ children }) => {
  const { loading, data: response, refetch } = useQuery(GET_PRODUCTS);

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (!loading) {
      setProducts(response?.products);
    }
  }, [loading, response]);

  const hasQuantityOnStock = useCallback(
    ({ productId, quantity }: IHasQuantityOnStock) => {
      const index = products.findIndex(product => product.id === productId);

      const product = products[index];

      return quantity <= product.quantity;
    },
    [products],
  );

  const updateProducts = useCallback(async () => {
    const { data } = await refetch();
    setProducts(data?.products);
  }, [refetch]);

  const value = React.useMemo(
    () => ({ products, loading, hasQuantityOnStock, updateProducts }),
    [loading, products, hasQuantityOnStock, updateProducts],
  );

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
