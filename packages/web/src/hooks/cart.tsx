import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { formatValue } from '../utils/formatValue';
import { IProduct } from './stock';

interface ICartContext {
  products: IProduct[];
  addToCart(product: Omit<IProduct, 'quantity'>): void;
  increment(product_id: string): void;
  decrement(product_id: string): void;
  totalItens: number;
  totalValue: string;
}

const CartContext = createContext<ICartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const storedProducts = localStorage.getItem('@shopping:cart');

      if (storedProducts) {
        setProducts([...JSON.parse(storedProducts)]);
      }
    }

    loadProducts();
  }, []);

  const saveProducts = useCallback(async (): Promise<void> => {
    localStorage.setItem('@shopping:cart', JSON.stringify(products));
  }, [products]);

  const increment = useCallback(
    async (id: string) => {
      const product = products.find((p) => p.id === id);

      if (product) {
        setProducts([
          ...products,
          { ...product, quantity: product.quantity + 1 },
        ]);

        await saveProducts();
      }
    },
    [products, saveProducts],
  );

  const decrement = useCallback(
    async (id: string) => {
      const product = products.find((p) => p.id === id);

      if (product) {
        setProducts([
          ...products,
          { ...product, quantity: product.quantity - 1 },
        ]);

        await saveProducts();
      }
    },
    [products, saveProducts],
  );

  const addToCart = useCallback(
    async (product: IProduct) => {
      const productExists = products.find((p) => p.id === product.id);

      if (productExists) {
        increment(productExists.id);
      } else {
        setProducts([...products, { ...product, quantity: 1 }]);
      }

      await saveProducts();
    },
    [increment, products, saveProducts],
  );

  const totalValue = useMemo(() => {
    const total = products.reduce((accumulator, product) => {
      const productTotal = product.price * product.quantity;

      return accumulator + productTotal;
    }, 0);

    return formatValue(total);
  }, [products]);

  const totalItens = useMemo(() => {
    const total = products.reduce(
      (accumulator: number, product: IProduct) => accumulator + product.quantity,
      0,
    );

    return total;
  }, [products]);

  const value = React.useMemo(
    () => ({
      addToCart,
      increment,
      decrement,
      products,
      totalValue,
      totalItens,
    }),
    [
      addToCart,
      increment,
      decrement,
      products,
      totalValue,
      totalItens,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): ICartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

export { CartProvider, useCart };
