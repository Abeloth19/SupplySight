import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type Warehouse {
    id: ID!
    name: String!
    location: String!
  }

  type KPIDataPoint {
    date: String!
    stock: Int!
    demand: Int!
  }

  type KPIResponse {
    totalStock: Int!
    totalDemand: Int!
    fillRate: Float!
    trendData: [KPIDataPoint!]!
  }

  type Query {
    products(search: String, warehouse: String, status: String): [Product!]!
    warehouses: [Warehouse!]!
    kpis(range: String!): KPIResponse!
  }

  type Mutation {
    updateDemand(productId: ID!, demand: Int!): Product!
    transferStock(productId: ID!, fromWarehouse: String!, toWarehouse: String!, quantity: Int!): Product!
  }
`;