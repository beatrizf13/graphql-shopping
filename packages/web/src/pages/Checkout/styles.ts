import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

export const ProductsList = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin: 4px;
  padding: 0.5rem;

  hr {
    margin: 12px 0;
  }
`;

export const Product = styled.div`
  display: flex;
  place-content: space-between;
  margin: 8px 0;
`;

export const CardTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #2583ca;
  margin-bottom: 12px;
`;

export const ProductInfo = styled.span``;

export const ProductTotal = styled.span``;

export const TotalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TotalItens = styled.span``;

export const TotalValue = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

export const PaymentInfo = styled.div`
  border-radius: 4px;
  padding: 0.5rem;

  p {
    margin-bottom: 12px;
  }

  form {
    margin: 24px 0;
  }
`;

export const CompletionContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin: 4px;
`;

export const InputAndDescription = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;

  > span {
    width: 224px;
  }

  @media screen and (max-width: 480px) {
    > span {
      width: 96px;
    }
  }
`;
