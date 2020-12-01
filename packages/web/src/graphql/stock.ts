import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      description
      imageUrl
      price
      quantity
    }
  }
`;

export const SHOW_PRODUCT = gql`
  query($id: String!) {
    product(id: $id) {
      id
      name
      description
      imageUrl
      price
      quantity
    }
  }
`;
