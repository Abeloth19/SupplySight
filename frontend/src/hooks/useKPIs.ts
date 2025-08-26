import { useQuery } from '@apollo/client/react';
import { GET_KPIS } from '../lib/queries';
import { type KPIResponse, type DateRange } from '../types';
import { type GetKPIsResponse } from '../types/graphql';

interface UseKPIsResult {
  kpis: KPIResponse | undefined;
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
}

export function useKPIs(range: DateRange): UseKPIsResult {
  const { data, loading, error, refetch } = useQuery<GetKPIsResponse>(GET_KPIS, {
    variables: { range },
    fetchPolicy: 'cache-and-network',
  });

  return {
    kpis: data?.kpis,
    loading,
    error,
    refetch,
  };
}