import { useState, useCallback } from 'react';
import { Container } from './Container';
import { DashboardHeader } from './DashboardHeader';
import { KPISection } from './KPISection';
import { StockDemandChart } from './StockDemandChart';
import { ProductFilters } from './ProductFilters';
import { ProductsTable } from './ProductsTable';
import { ProductDetailDrawer } from './ProductDetailDrawer';
import { Toast } from './Toast';
import { NetworkStatus } from './NetworkStatus';
import { useProductFilters } from '../hooks/useProductFilters';
import { useUpdateDemand, useTransferStock } from '../hooks/useMutations';
import { useToast } from '../hooks/useToast';
import { type DateRange, type ProductFilters as ProductFiltersType, type Product } from '../types';

export function Dashboard() {
  const [selectedRange, setSelectedRange] = useState<DateRange>('7d');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { filters, updateFilters } = useProductFilters();
  const { toast, showToast, hideToast } = useToast();
  
  const [updateDemandMutation, { loading: updatingDemand }] = useUpdateDemand();
  const [transferStockMutation, { loading: transferringStock }] = useTransferStock();

  const handleRangeChange = useCallback((range: DateRange) => {
    setSelectedRange(range);
  }, []);

  const handleFiltersChange = useCallback((newFilters: ProductFiltersType) => {
    updateFilters(newFilters);
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleUpdateDemand = useCallback(async (productId: string, demand: number) => {
    try {
      const result = await updateDemandMutation({
        variables: { productId, demand }
      });
      
      if (result.data?.updateDemand) {
       
        setSelectedProduct(result.data.updateDemand);
        showToast(`Demand updated to ${demand} units successfully!`, 'success');
      }
    } catch (error) {
      console.error('Error updating demand:', error);
      showToast('Failed to update demand. Please try again.', 'error');
    }
  }, [updateDemandMutation, showToast]);

  const handleTransferStock = useCallback(async (productId: string, fromWarehouse: string, toWarehouse: string, quantity: number) => {
    try {
      const result = await transferStockMutation({
        variables: { productId, fromWarehouse, toWarehouse, quantity }
      });
      
      if (result.data?.transferStock) {
       
        setSelectedProduct(result.data.transferStock);
        showToast(`Transferred ${quantity} units to ${toWarehouse} successfully!`, 'success');
      }
    } catch (error) {
      console.error('Error transferring stock:', error);
      showToast('Failed to transfer stock. Please try again.', 'error');
    }
  }, [transferStockMutation, showToast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NetworkStatus />
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

      <ProductDetailDrawer
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseDrawer}
        onUpdateDemand={handleUpdateDemand}
        onTransferStock={handleTransferStock}
        isUpdatingDemand={updatingDemand}
        isTransferringStock={transferringStock}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}