import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/produtos" component={Products} isPrivate />
    <Route path="/produto/:id" component={ProductDetails} isPrivate />
    <Route path="/carrinho" component={Cart} isPrivate />
    <Route path="/pagamento" component={Checkout} isPrivate />
    <Route path="/compras" component={Orders} isPrivate />
    <Route path="*" component={() => <Redirect to="/" />} />
  </Switch>
);

export default Routes;
