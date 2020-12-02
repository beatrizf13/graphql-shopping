import React from 'react';

import Header from './Header';

const Wrapper: React.FC = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Wrapper;
