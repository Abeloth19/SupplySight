import { useState } from 'react';
import { type Product } from '../types';
import { getProductStatus, formatNumber } from '../utils/helpers';
import { StatusPill } from './StatusPill';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { useWarehouses } from '../hooks/useWarehouses';

interface ProductDetailDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateDemand?: (productId: string, demand: number) => void;
  onTransferStock?: (productId: string, fromWarehouse: string, toWarehouse: string, quantity: number) => void;
}

export function ProductDetailDrawer({ 
  product, 
  isOpen, 
  onClose,
  onUpdateDemand,
  onTransferStock 
}: ProductDetailDrawerProps) {
  const { warehouses } = useWarehouses();
  const [demandValue, setDemandValue] = useState('');
  const [transferQuantity, setTransferQuantity] = useState('');
  const [targetWarehouse, setTargetWarehouse] = useState('');
  const [activeForm, setActiveForm] = useState<'demand' | 'transfer' | null>(null);

  if (!isOpen || !product) return null;

  const status = getProductStatus(product.stock, product.demand);
  const availableWarehouses = warehouses.filter(w => w.id !== product.warehouse);

  const handleUpdateDemand = (e: React.FormEvent) => {
    e.preventDefault();
    const demand = parseInt(demandValue);
    if (onUpdateDemand && !isNaN(demand) && demand >= 0) {
      onUpdateDemand(product.id, demand);
      setDemandValue('');
      setActiveForm(null);
    }
  };

  const handleTransferStock = (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = parseInt(transferQuantity);
    if (onTransferStock && targetWarehouse && !isNaN(quantity) && quantity > 0 && quantity <= product.stock) {
      onTransferStock(product.id, product.warehouse, targetWarehouse, quantity);
      setTransferQuantity('');
      setTargetWarehouse('');
      setActiveForm(null);
    }
  };

  const resetForms = () => {
    setDemandValue('');
    setTransferQuantity('');
    setTargetWarehouse('');
    setActiveForm(null);
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
        />
      )}
      
      <div className={`
        fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">{product.name}</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Product ID</span>
                  <p className="font-medium text-gray-900">{product.id}</p>
                </div>
                <div>
                  <span className="text-gray-500">SKU</span>
                  <p className="font-mono text-gray-900">{product.sku}</p>
                </div>
                <div>
                  <span className="text-gray-500">Warehouse</span>
                  <p className="font-medium text-gray-900">{product.warehouse}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status</span>
                  <div className="mt-1">
                    <StatusPill status={status} />
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Current Stock</span>
                  <p className="font-bold text-lg text-gray-900">{formatNumber(product.stock)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Demand</span>
                  <p className="font-bold text-lg text-gray-900">{formatNumber(product.demand)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-medium text-gray-900 mb-4">Actions</h4>
                
                <div className="space-y-3">
                  <Button
                    variant={activeForm === 'demand' ? 'primary' : 'outline'}
                    onClick={() => {
                      if (activeForm === 'demand') {
                        setActiveForm(null);
                        setDemandValue('');
                      } else {
                        setActiveForm('demand');
                        setDemandValue(product.demand.toString());
                      }
                    }}
                    className="w-full justify-start"
                  >
                    📈 Update Demand
                  </Button>

                  <Button
                    variant={activeForm === 'transfer' ? 'primary' : 'outline'}
                    onClick={() => {
                      if (activeForm === 'transfer') {
                        setActiveForm(null);
                        setTransferQuantity('');
                        setTargetWarehouse('');
                      } else {
                        setActiveForm('transfer');
                      }
                    }}
                    className="w-full justify-start"
                    disabled={product.stock === 0}
                  >
                    🚚 Transfer Stock
                  </Button>
                </div>
              </div>

              {activeForm === 'demand' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-3">Update Demand</h5>
                  <form onSubmit={handleUpdateDemand} className="space-y-3">
                    <Input
                      type="number"
                      label="New Demand"
                      value={demandValue}
                      onChange={(e) => setDemandValue(e.target.value)}
                      min="0"
                      required
                    />
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">
                        Update
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveForm(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {activeForm === 'transfer' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-3">Transfer Stock</h5>
                  <form onSubmit={handleTransferStock} className="space-y-3">
                    <Input
                      type="number"
                      label="Quantity to Transfer"
                      value={transferQuantity}
                      onChange={(e) => setTransferQuantity(e.target.value)}
                      min="1"
                      max={product.stock}
                      required
                      helperText={`Available: ${formatNumber(product.stock)} units`}
                    />
                    <Select
                      label="Target Warehouse"
                      value={targetWarehouse}
                      onChange={(e) => setTargetWarehouse(e.target.value)}
                      options={[
                        { value: '', label: 'Select warehouse...' },
                        ...availableWarehouses.map(w => ({
                          value: w.id,
                          label: `${w.name} (${w.location})`
                        }))
                      ]}
                      required
                    />
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">
                        Transfer
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveForm(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}