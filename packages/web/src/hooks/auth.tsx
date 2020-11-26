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

interface IAuthContext {
  costumer: ICostumer;
  signIn(credentials: ICredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [costumer, setCostumer] = useState<ICostumer>(() => {
    const storedCostumer = localStorage.getItem('@shopping:costumer');

    if (storedCostumer) {
      return JSON.parse(storedCostumer);
    }

    return {} as ICostumer;
  });

  const [createCostumer, { data: response }] = useMutation(CREATE_COSTUMER);

  const signIn = useCallback(
    async ({ name }) => {
      await createCostumer({ variables: { name } });

      const createdCostumer = response.createCostumer;

      if (!costumer) return;

      localStorage.setItem('@shopping:costumer', JSON.stringify(costumer));

      setCostumer(createdCostumer);
    },
    [costumer, createCostumer, response],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@shopping:costumer');

    setCostumer({} as ICostumer);
  }, []);

  const value = React.useMemo(
    () => ({
      costumer,
      signIn,
      signOut,
    }),
    [costumer, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
