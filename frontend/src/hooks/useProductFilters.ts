import { useState, useCallback } from 'react';
import { type ProductFilters } from '../types';

const initialFilters: ProductFilters = {
  search: '',
  warehouse: '',
  status: 'all',
};

export function useProductFilters() {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const updateFilters = useCallback((newFilters: ProductFilters) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const hasActiveFilters = filters.search || filters.warehouse || filters.status !== 'all';

  return {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  };
}