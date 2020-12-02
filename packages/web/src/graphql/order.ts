import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation($costumerId: ID!, $items: [Item!]!) {
    createOrder(data: { costumerId: $costumerId, items: $items }) {
      id
      costumer {
        name
      }
      items {
        product {
          name
        }
        quantity
        price
      }
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
