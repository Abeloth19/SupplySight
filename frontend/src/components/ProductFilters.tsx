import { useState, useEffect, useCallback, useMemo } from 'react';
import { Input } from './Input';
import { Select } from './Select';
import { Card } from './Card';
import { useWarehouses } from '../hooks/useWarehouses';
import { type ProductFilters } from '../types';
import { debounce } from '../utils/helpers';

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const { warehouses, loading: warehousesLoading } = useWarehouses();
  const [searchValue, setSearchValue] = useState(filters.search);

  const handleSearchChange = useCallback((value: string) => {
    onFiltersChange({ ...filters, search: value });
  }, [filters.warehouse, filters.status, onFiltersChange]);

  const debouncedSearch = useMemo(
    () => debounce(handleSearchChange, 300),
    [handleSearchChange]
  );

  useEffect(() => {
    if (searchValue !== filters.search) {
      debouncedSearch(searchValue);
    }
  }, [searchValue]);

  const warehouseOptions = [
    { value: '', label: 'All Warehouses' },
    ...warehouses.map(w => ({ value: w.id, label: `${w.name} (${w.location})` }))
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'healthy', label: '🟢 Healthy' },
    { value: 'low', label: '🟡 Low' },
    { value: 'critical', label: '🔴 Critical' },
  ];

  const handleWarehouseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, warehouse: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, status: e.target.value });
  };

  const clearFilters = () => {
    setSearchValue('');
    onFiltersChange({ search: '', warehouse: '', status: 'all' });
  };

  const hasActiveFilters = filters.search || filters.warehouse || filters.status !== 'all';

  return (
    <Card className="mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 lg:max-w-md">
          <Input
            placeholder="Search by product name, SKU, or ID..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 lg:flex-1">
          <div className="flex-1">
            <Select
              options={warehouseOptions}
              value={filters.warehouse}
              onChange={handleWarehouseChange}
              disabled={warehousesLoading}
              className="w-full"
            />
          </div>
          
          <div className="flex-1">
            <Select
              options={statusOptions}
              value={filters.status}
              onChange={handleStatusChange}
              className="w-full"
            />
          </div>
          
          {hasActiveFilters && (
            <div className="flex-shrink-0">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.search && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Search: "{filters.search}"
              </span>
            )}
            {filters.warehouse && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Warehouse: {warehouses.find(w => w.id === filters.warehouse)?.name || filters.warehouse}
              </span>
            )}
            {filters.status !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Status: {statusOptions.find(s => s.value === filters.status)?.label || filters.status}
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}