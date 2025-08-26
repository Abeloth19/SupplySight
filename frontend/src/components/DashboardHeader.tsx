import { Container } from './Container';
import { DateChips } from './DateChips';
import { type DateRange } from '../types';

interface DashboardHeaderProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

export function DashboardHeader({ selectedRange, onRangeChange }: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                SupplySight
              </h1>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm text-gray-600">Daily Inventory Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-gray-600">Time Range:</span>
              <DateChips selectedRange={selectedRange} onRangeChange={onRangeChange} />
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span>Live</span>
            </div>
          </div>
        </div>
        
        <div className="md:hidden pb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Time Range:</span>
            <DateChips selectedRange={selectedRange} onRangeChange={onRangeChange} />
          </div>
        </div>
      </Container>
    </div>
  );
}