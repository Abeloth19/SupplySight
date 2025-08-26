import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS } from '../lib/queries';
import { type Product, type ProductFilters } from '../types';
import { type GetProductsResponse } from '../types/graphql';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
}

export function useProducts(filters: ProductFilters): UseProductsResult {
  const { data, loading, error, refetch } = useQuery<GetProductsResponse>(GET_PRODUCTS, {
    variables: {
      search: filters.search || null,
      warehouse: filters.warehouse || null,
      status: filters.status === 'all' ? null : filters.status || null,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    products: data?.products || [],
    loading,
    error,
    refetch,
  };
}