import { Card } from './Card';
import { formatNumber, formatPercent } from '../utils/helpers';

interface KPICardProps {
  title: string;
  value: number;
  format?: 'number' | 'percent';
  icon?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
}

export function KPICard({ title, value, format = 'number', icon, trend }: KPICardProps) {
  const formattedValue = format === 'percent' ? formatPercent(value) : formatNumber(value);

  const getTrendColor = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return 'text-success-600';
      case 'down':
        return 'text-danger-600';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '→';
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            {icon && <span className="text-lg">{icon}</span>}
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formattedValue}</p>
          {trend && (
            <div className={`flex items-center space-x-1 mt-2 ${getTrendColor(trend.direction)}`}>
              <span>{getTrendIcon(trend.direction)}</span>
              <span className="text-sm font-medium">
                {formatPercent(Math.abs(trend.value))}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}