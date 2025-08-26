import { useState, useCallback } from 'react';
import { Container } from './Container';
import { DashboardHeader } from './DashboardHeader';
import { KPISection } from './KPISection';
import { StockDemandChart } from './StockDemandChart';
import { ProductFilters } from './ProductFilters';
import { ProductsTable } from './ProductsTable';
import { useProductFilters } from '../hooks/useProductFilters';
import { type DateRange, type ProductFilters as ProductFiltersType, type Product } from '../types';

export function Dashboard() {
  const [selectedRange, setSelectedRange] = useState<DateRange>('7d');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { filters, updateFilters } = useProductFilters();

  const handleRangeChange = useCallback((range: DateRange) => {
    setSelectedRange(range);
  }, []);

  const handleFiltersChange = useCallback((newFilters: ProductFiltersType) => {
    updateFilters(newFilters);
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        selectedRange={selectedRange} 
        onRangeChange={handleRangeChange} 
      />
      
      <Container>
        <div className="py-8 space-y-8">
          <KPISection selectedRange={selectedRange} />
          
          <StockDemandChart selectedRange={selectedRange} />
          
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Products Inventory</h2>
              <p className="text-gray-600">
                Monitor and manage your product inventory across all warehouses
              </p>
            </div>
            
            <ProductFilters 
              filters={filters} 
              onFiltersChange={handleFiltersChange} 
            />
            
            <ProductsTable 
              filters={filters}
              onProductClick={handleProductClick}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}