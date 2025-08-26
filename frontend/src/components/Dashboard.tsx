import { useState, useCallback } from 'react';
import { Container } from './Container';
import { DashboardHeader } from './DashboardHeader';
import { KPISection } from './KPISection';
import { StockDemandChart } from './StockDemandChart';
import { ProductFilters } from './ProductFilters';
import { useProductFilters } from '../hooks/useProductFilters';
import { type DateRange, type ProductFilters as ProductFiltersType } from '../types';

export function Dashboard() {
  const [selectedRange, setSelectedRange] = useState<DateRange>('7d');
  const { filters, updateFilters } = useProductFilters();

  const handleRangeChange = useCallback((range: DateRange) => {
    setSelectedRange(range);
  }, []);

  const handleFiltersChange = useCallback((newFilters: ProductFiltersType) => {
    updateFilters(newFilters);
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
            
            <div className="bg-white rounded-lg border p-6">
         
              <div className="mt-4 text-sm text-gray-500">
                <p>Current filters:</p>
                <pre className="mt-2 bg-gray-50 p-2 rounded">
                  {JSON.stringify(filters, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}