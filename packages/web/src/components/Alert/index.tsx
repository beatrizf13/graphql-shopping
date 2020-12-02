import React from 'react';

import { Container } from './styles';

interface IAlertProps {
  message: string;
}

const Alert: React.FC<IAlertProps> = ({ message }) => (
  <Container>
    <span>{message}</span>
  </Container>
);

export default Alert;
