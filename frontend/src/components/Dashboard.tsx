import { useState } from 'react';
import { Container } from './Container';
import { DashboardHeader } from './DashboardHeader';
import { KPISection } from './KPISection';
import { StockDemandChart } from './StockDemandChart';
import { type DateRange } from '../types';

export function Dashboard() {
  const [selectedRange, setSelectedRange] = useState<DateRange>('7d');

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        selectedRange={selectedRange} 
        onRangeChange={setSelectedRange} 
      />
      
      <Container>
        <div className="py-8 space-y-8">
          <KPISection selectedRange={selectedRange} />
          
          <StockDemandChart selectedRange={selectedRange} />
          
          </div>
      </Container>
    </div>
  );
}