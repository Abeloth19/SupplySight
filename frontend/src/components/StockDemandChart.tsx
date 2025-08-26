import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useKPIs } from '../hooks/useKPIs';
import { type DateRange } from '../types';
import { formatDate, formatNumber } from '../utils/helpers';
import { LoadingSpinner } from './LoadingSpinner';
import { Card } from './Card';

interface StockDemandChartProps {
  selectedRange: DateRange;
}

export function StockDemandChart({ selectedRange }: StockDemandChartProps) {
  const { kpis, loading, error } = useKPIs(selectedRange);

  if (loading) {
    return (
      <Card className="h-96">
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner size="lg" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-96">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-danger-600 font-medium">Error loading chart data</p>
            <p className="text-gray-500 text-sm mt-1">{error.message}</p>
          </div>
        </div>
      </Card>
    );
  }

  if (!kpis?.trendData?.length) {
    return (
      <Card className="h-96">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No chart data available</p>
        </div>
      </Card>
    );
  }

  const chartData = kpis.trendData.map(point => ({
    ...point,
    formattedDate: formatDate(point.date),
  }));

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ dataKey: string; value: number; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700">
                {entry.dataKey === 'stock' ? 'Stock' : 'Demand'}: 
                <span className="font-semibold ml-1">
                  {formatNumber(entry.value)}
                </span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Stock vs Demand Trend
        </h2>
        <p className="text-sm text-gray-600">
          Inventory levels over the last {selectedRange === '7d' ? '7 days' : selectedRange === '14d' ? '14 days' : '30 days'}
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="formattedDate" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => formatNumber(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="stock" 
              stroke="#22c55e" 
              strokeWidth={3}
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#22c55e' }}
              name="Stock"
            />
            <Line 
              type="monotone" 
              dataKey="demand" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#3b82f6' }}
              name="Demand"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}