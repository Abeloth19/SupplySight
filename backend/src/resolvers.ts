import { products, warehouses, generateKPIData } from './data.js';

const getProductStatus = (stock: number, demand: number) => {
  if (stock > demand) return 'healthy';
  if (stock === demand) return 'low';
  return 'critical';
};

export const resolvers = {
  Query: {
    products: (_: any, { search, warehouse, status }: any) => {
      let filtered = [...products];

      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.sku.toLowerCase().includes(searchLower) ||
          p.id.toLowerCase().includes(searchLower)
        );
      }

      if (warehouse) {
        filtered = filtered.filter(p => p.warehouse === warehouse);
      }

      if (status && status !== 'all') {
        filtered = filtered.filter(p => getProductStatus(p.stock, p.demand) === status);
      }

      return filtered;
    },

    warehouses: () => warehouses,

    kpis: (_: any, { range }: any) => {
      const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
      const totalDemand = products.reduce((sum, p) => sum + p.demand, 0);
      const fulfilled = products.reduce((sum, p) => sum + Math.min(p.stock, p.demand), 0);
      const fillRate = totalDemand > 0 ? (fulfilled / totalDemand) * 100 : 0;

      return {
        totalStock,
        totalDemand,
        fillRate: Math.round(fillRate * 100) / 100,
        trendData: generateKPIData(range)
      };
    }
  },

  Mutation: {
    updateDemand: (_: any, { productId, demand }: any) => {
      const product = products.find(p => p.id === productId);
      if (!product) throw new Error('Product not found');
      
      product.demand = demand;
      return product;
    },

    transferStock: (_: any, { productId, fromWarehouse, toWarehouse, quantity }: any) => {
      const product = products.find(p => p.id === productId);
      if (!product) throw new Error('Product not found');
      
      if (product.warehouse !== fromWarehouse) {
        throw new Error('Product not in specified warehouse');
      }
      
      if (product.stock < quantity) {
        throw new Error('Insufficient stock for transfer');
      }
      
      product.stock -= quantity;
      product.warehouse = toWarehouse;
      
      return product;
    }
  }
};