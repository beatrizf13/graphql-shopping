import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation($costumerId: ID!, $items: [Item!]!, $creditCard: String!) {
    createOrder(
      data: { costumerId: $costumerId, creditCard: $creditCard, items: $items }
    ) {
      items {
        id
        product {
          name
        }
        quantity
        price
      }
      createdAt
      totalPrice
    }
  }
`;

export const GET_ORDERS = gql`
  query($costumerId: ID!) {
    ordersByCostumer(data: { costumerId: $costumerId }) {
      id
      items {
        id
        product {
          name
        }
        quantity
        price
      }
      createdAt
      totalPrice
    }
  }
`;
