import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { formatValue } from '../utils/formatValue';
import { IProduct, useStock } from './stock';

interface ICartContext {
  products: IProduct[];
  addToCart(product: Omit<IProduct, 'quantity'>): void;
  increment(productId: string): void;
  decrement(productId: string): void;
  totalItens: number;
  totalValue: string;
}

const CartContext = createContext<ICartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>(() => {
    const storedProducts = localStorage.getItem('@shopping:cart');

    if (storedProducts) {
      return [...JSON.parse(storedProducts)];
    }

    return [];
  });

  const { hasQuantityOnStock } = useStock();

  const updateCartOnStorage = useCallback((): void => {
    localStorage.setItem('@shopping:cart', JSON.stringify(products));
  }, [products]);

  const increment = useCallback(
    (productId: string): void => {
      const index = products.findIndex(product => product.id === productId);
      const newQuantity = products[index].quantity + 1;

      if (hasQuantityOnStock({ productId, quantity: newQuantity })) {
        const newProducts = [...products];

        newProducts[index].quantity = newQuantity;

        setProducts(newProducts);
        updateCartOnStorage();
      }
    },
    [hasQuantityOnStock, products, updateCartOnStorage],
  );

  const decrement = useCallback(
    (productId: string): void => {
      const index = products.findIndex(product => product.id === productId);
      let newProducts = [...products];

      if (newProducts[index].quantity === 1) {
        newProducts = newProducts.filter(product => product.id !== productId);
      } else {
        newProducts[index].quantity -= 1;
      }

      setProducts(newProducts);
      updateCartOnStorage();
    },
    [products, updateCartOnStorage],
  );

  const addToCart = useCallback(
    (product: IProduct): void => {
      const productExists = products.find(p => p.id === product.id);

      if (productExists) {
        increment(productExists.id);
      } else {
        setProducts([...products, { ...product, quantity: 1 }]);
      }

      updateCartOnStorage();
    },
    [increment, products, updateCartOnStorage],
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
      (accumulator: number, product: IProduct) =>
        accumulator + product.quantity,
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
    [addToCart, increment, decrement, products, totalValue, totalItens],
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
