import { type ProductStatus } from '../types';

export const getProductStatus = (stock: number, demand: number): ProductStatus => {
  if (stock > demand) return 'healthy';
  if (stock === demand) return 'low';
  return 'critical';
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const formatPercent = (num: number): string => {
  return `${num.toFixed(1)}%`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func(...args), delay);
  };
};