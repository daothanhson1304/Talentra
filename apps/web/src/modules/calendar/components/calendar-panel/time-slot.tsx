import { cn } from '@ttrak/ui/lib/utils';
import { snappedHeightSelector } from '../../stores/selector/calendar-selector';
import { useSelector } from 'react-redux';

interface TimeSlotProps {
  className?: string;
  children?: React.ReactNode;
}
export default function TimeSlot({ className }: Readonly<TimeSlotProps>) {
  const snappedHeight = useSelector(snappedHeightSelector);
  return (
    <div
      className={cn(className, `relative transition-colors duration-200 pr-3`)}
      style={{
        height: `${snappedHeight}px`,
      }}
    ></div>
  );
}
