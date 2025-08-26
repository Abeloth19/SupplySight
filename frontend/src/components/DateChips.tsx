import { type DateRange } from '../types';
import { Button } from './Button';

interface DateChipsProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

export function DateChips({ selectedRange, onRangeChange }: DateChipsProps) {
  const ranges: { label: string; value: DateRange }[] = [
    { label: '7 Days', value: '7d' },
    { label: '14 Days', value: '14d' },
    { label: '30 Days', value: '30d' },
  ];

  return (
    <div className="flex space-x-2">
      {ranges.map((range) => (
        <Button
          key={range.value}
          variant={selectedRange === range.value ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onRangeChange(range.value)}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
}