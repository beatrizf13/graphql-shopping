import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #0083ca;
  height: 46px;
  border-radius: 4px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 600;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#0083ca')};
  }
`;
