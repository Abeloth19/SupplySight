import { useProducts } from '../hooks/useProducts';
import { usePagination } from '../hooks/usePagination';
import { getProductStatus, formatNumber } from '../utils/helpers';
import { type ProductFilters, type Product } from '../types';
import { StatusPill } from './StatusPill';
import { LoadingSpinner } from './LoadingSpinner';
import { Card } from './Card';
import { Pagination } from './Pagination';

interface ProductsTableProps {
  filters: ProductFilters;
  onProductClick: (product: Product) => void;
}

export function ProductsTable({ filters, onProductClick }: ProductsTableProps) {
  const { products, loading, error } = useProducts(filters);
  const pagination = usePagination({ data: products, itemsPerPage: 10 });

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <p className="text-danger-600 font-medium">Error loading products</p>
          <p className="text-gray-500 text-sm mt-1">{error.message}</p>
        </div>
      </Card>
    );
  }

  if (products.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <p className="text-gray-500 font-medium">No products found</p>
          <p className="text-gray-400 text-sm mt-1">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="none">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 font-medium text-gray-900">Product</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">SKU</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Warehouse</th>
              <th className="text-right py-4 px-6 font-medium text-gray-900">Stock</th>
              <th className="text-right py-4 px-6 font-medium text-gray-900">Demand</th>
              <th className="text-center py-4 px-6 font-medium text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody>
            {pagination.paginatedData.map((product: Product) => {
              const status = getProductStatus(product.stock, product.demand);
              const isCritical = status === 'critical';
              
              return (
                <tr
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className={`
                    border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors
                    ${isCritical ? 'bg-danger-50 hover:bg-danger-100' : ''}
                  `}
                >
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">ID: {product.id}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm">{product.sku}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{product.warehouse}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-medium text-gray-900">
                      {formatNumber(product.stock)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-medium text-gray-900">
                      {formatNumber(product.demand)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <StatusPill status={status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.goToPage}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
          totalItems={pagination.totalItems}
          startIndex={pagination.startIndex}
          endIndex={pagination.endIndex}
        />
      </div>
    </Card>
  );
}