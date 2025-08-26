import { useKPIs } from '../hooks/useKPIs';
import { type DateRange } from '../types';
import { KPICard } from './KPICard';
import { LoadingSpinner } from './LoadingSpinner';

interface KPISectionProps {
  selectedRange: DateRange;
}

export function KPISection({ selectedRange }: KPISectionProps) {
  const { kpis, loading, error } = useKPIs(selectedRange);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg border p-6">
            <LoadingSpinner />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
        <p className="text-danger-600">Error loading KPIs: {error.message}</p>
      </div>
    );
  }

  if (!kpis) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600">No KPI data available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KPICard
        title="Total Stock"
        value={kpis.totalStock}
        format="number"
        icon="📦"
      />
      
      <KPICard
        title="Total Demand"
        value={kpis.totalDemand}
        format="number"
        icon="📈"
      />
      
      <KPICard
        title="Fill Rate"
        value={kpis.fillRate}
        format="percent"
        icon="🎯"
        trend={{
          value: kpis.fillRate > 75 ? 5 : -3,
          direction: kpis.fillRate > 75 ? 'up' : 'down'
        }}
      />
    </div>
  );
}