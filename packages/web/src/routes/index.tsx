import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Products from '../pages/Products';
import Cart from '../pages/Cart';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/produtos" component={Products} isPrivate />
    <Route path="/carrinho" component={Cart} isPrivate />
    <Route path="*" component={() => <Redirect to="/" />} />
  </Switch>
);

export default Routes;
