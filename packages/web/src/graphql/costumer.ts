import { gql } from '@apollo/client';

export const CREATE_COSTUMER = gql`
  mutation($name: String!) {
    createCostumer(data: { name: $name }) {
      id
      name
    }
  }
`;
