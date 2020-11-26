import React, {
  createContext, useCallback, useState, useContext,
} from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COSTUMER } from '../graphql/costumer';

interface ICredentials {
  name: string;
}

interface ICostumer {
  id: string;
  name: string;
}

interface IAuthState {
  costumer: ICostumer;
}

interface IAuthContext {
  costumer: ICostumer;
  signIn(credentials: ICredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const costumer = localStorage.getItem('@shopping:costumer');

    if (costumer) {
      return { costumer: JSON.parse(costumer) };
    }

    return {} as IAuthState;
  });

  const [createCostumer, { data: response }] = useMutation(CREATE_COSTUMER);

  const signIn = useCallback(
    async ({ name }) => {
      await createCostumer({ variables: { name } });

      const costumer = response.createCostumer;

      if (!costumer) return;

      localStorage.setItem('@shopping:costumer', JSON.stringify(costumer));

      setData({ costumer });
    },
    [createCostumer, response],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@shopping:costumer');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ costumer: data.costumer, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
