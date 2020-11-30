import React from 'react';
import Footer from '../Footer';

import Header from '../Header';

const Wrapper: React.FC = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Wrapper;
