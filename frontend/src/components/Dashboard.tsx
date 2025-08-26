import { useState } from 'react';
import { Container } from './Container';
import { DashboardHeader } from './DashboardHeader';
import { KPISection } from './KPISection';
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
          
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Inventory Overview
            </h2>
         
          </div>
        </div>
      </Container>
    </div>
  );
}