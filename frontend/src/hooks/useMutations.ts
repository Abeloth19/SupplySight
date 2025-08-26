import { useMutation } from '@apollo/client/react';
import { UPDATE_DEMAND, TRANSFER_STOCK } from '../lib/mutations';
import { GET_PRODUCTS, GET_KPIS } from '../lib/queries';
import { type UpdateDemandResponse, type TransferStockResponse } from '../types/graphql';

interface UpdateDemandVariables {
  productId: string;
  demand: number;
}

interface TransferStockVariables {
  productId: string;
  fromWarehouse: string;
  toWarehouse: string;
  quantity: number;
}

export function useUpdateDemand() {
  return useMutation<UpdateDemandResponse, UpdateDemandVariables>(UPDATE_DEMAND, {
    refetchQueries: [GET_PRODUCTS, GET_KPIS],
    onError: (error) => {
      console.error('Update demand error:', error);
    },
  });
}

export function useTransferStock() {
  return useMutation<TransferStockResponse, TransferStockVariables>(TRANSFER_STOCK, {
    refetchQueries: [GET_PRODUCTS, GET_KPIS],
    onError: (error) => {
      console.error('Transfer stock error:', error);
    },
  });
}