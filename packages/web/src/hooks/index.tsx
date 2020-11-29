import React from 'react';

import { AuthProvider } from './auth';
import { CartProvider } from './cart';
import { StockProvider } from './stock';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <StockProvider>
      <CartProvider>{children}</CartProvider>
    </StockProvider>
  </AuthProvider>
);

export default AppProvider;
