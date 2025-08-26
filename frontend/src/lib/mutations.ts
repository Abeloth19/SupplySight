import { gql } from '@apollo/client';

export const UPDATE_DEMAND = gql`
  mutation UpdateDemand($productId: ID!, $demand: Int!) {
    updateDemand(productId: $productId, demand: $demand) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

export const TRANSFER_STOCK = gql`
  mutation TransferStock(
    $productId: ID!
    $fromWarehouse: String!
    $toWarehouse: String!
    $quantity: Int!
  ) {
    transferStock(
      productId: $productId
      fromWarehouse: $fromWarehouse
      toWarehouse: $toWarehouse
      quantity: $quantity
    ) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;