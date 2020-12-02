import React from 'react';

import { AuthProvider } from './auth';
import { CartProvider } from './cart';
import { StockProvider } from './stock';
import { OrderProvider } from './order';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <StockProvider>
      <CartProvider>
        <OrderProvider>{children}</OrderProvider>
      </CartProvider>
    </StockProvider>
  </AuthProvider>
);

export default AppProvider;
