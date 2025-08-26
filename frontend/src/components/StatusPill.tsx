import { type ProductStatus } from '../types';

interface StatusPillProps {
  status: ProductStatus;
  className?: string;
}

export function StatusPill({ status, className = '' }: StatusPillProps) {
  const getStatusConfig = (status: ProductStatus) => {
    switch (status) {
      case 'healthy':
        return {
          label: 'Healthy',
          emoji: '🟢',
          classes: 'bg-success-100 text-success-600 border-success-200',
        };
      case 'low':
        return {
          label: 'Low',
          emoji: '🟡',
          classes: 'bg-warning-100 text-warning-600 border-warning-200',
        };
      case 'critical':
        return {
          label: 'Critical',
          emoji: '🔴',
          classes: 'bg-danger-100 text-danger-600 border-danger-200',
        };
      default:
        return {
          label: 'Unknown',
          emoji: '⚪',
          classes: 'bg-gray-100 text-gray-600 border-gray-200',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
        ${config.classes}
        ${className}
      `}
    >
      <span className="mr-1.5">{config.emoji}</span>
      {config.label}
    </span>
  );
}