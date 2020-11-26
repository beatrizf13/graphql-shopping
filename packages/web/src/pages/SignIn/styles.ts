import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;

  h1 {
    text-align: center;
    margin-bottom: 16px;
    font-weight: 600;
    color: #0083ca;
  }
`;
