import React from 'react';

import { useAuth } from '../../../hooks/auth';
import { Container } from './styles';

const Footer: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = (): void => signOut();

  return (
    <Container>
      <button type="button" onClick={handleSignOut}>
        Sair
      </button>
    </Container>
  );
};

export default Footer;
