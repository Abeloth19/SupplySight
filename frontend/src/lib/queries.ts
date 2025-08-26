import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($search: String, $warehouse: String, $status: String) {
    products(search: $search, warehouse: $warehouse, status: $status) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      id
      name
      location
    }
  }
`;

export const GET_KPIS = gql`
  query GetKPIs($range: String!) {
    kpis(range: $range) {
      totalStock
      totalDemand
      fillRate
      trendData {
        date
        stock
        demand
      }
    }
  }
`;