import { useQuery } from '@apollo/client/react';
import { GET_WAREHOUSES } from '../lib/queries';
import { type Warehouse } from '../types';
import { type GetWarehousesResponse } from '../types/graphql';

interface UseWarehousesResult {
  warehouses: Warehouse[];
  loading: boolean;
  error: Error | undefined;
}

export function useWarehouses(): UseWarehousesResult {
  const { data, loading, error } = useQuery<GetWarehousesResponse>(GET_WAREHOUSES, {
    fetchPolicy: 'cache-first',
  });

  return {
    warehouses: data?.warehouses || [],
    loading,
    error,
  };
}