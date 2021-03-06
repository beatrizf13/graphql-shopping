import React from 'react';
import {
  RouteProps as ReactDOMProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import Wrapper from '../components/Wrapper';

import { useAuth } from '../hooks/auth';

interface ReactProps extends ReactDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<ReactProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { costumer } = useAuth();

  const Page: React.FC = () =>
    isPrivate ? (
      <Wrapper>
        <Component />
      </Wrapper>
    ) : (
      <Component />
    );

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) =>
        isPrivate === !!costumer ? (
          <Page />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/produtos',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default Route;
