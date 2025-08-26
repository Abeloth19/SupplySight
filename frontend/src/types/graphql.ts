import { type Product, type Warehouse, type KPIResponse } from './index';

export interface GetProductsResponse {
  products: Product[];
}

export interface GetWarehousesResponse {
  warehouses: Warehouse[];
}

export interface GetKPIsResponse {
  kpis: KPIResponse;
}

export interface UpdateDemandResponse {
  updateDemand: Product;
}

export interface TransferStockResponse {
  transferStock: Product;
}