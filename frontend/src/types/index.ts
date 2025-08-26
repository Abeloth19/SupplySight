export interface Product {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
}

export interface KPIDataPoint {
  date: string;
  stock: number;
  demand: number;
}

export interface KPIResponse {
  totalStock: number;
  totalDemand: number;
  fillRate: number;
  trendData: KPIDataPoint[];
}

export type ProductStatus = 'healthy' | 'low' | 'critical';

export type DateRange = '7d' | '14d' | '30d';

export interface ProductFilters {
  search: string;
  warehouse: string;
  status: string;
}