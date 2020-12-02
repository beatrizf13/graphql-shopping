import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #58c22e;
  height: 36px;
  border-radius: 4px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 600;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#58c22e')};
  }
`;
