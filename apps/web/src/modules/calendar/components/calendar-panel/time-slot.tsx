import { useDroppable } from '@dnd-kit/core';
import { cn } from '@ttrak/ui/lib/utils';

interface TimeSlotProps {
  id: string;
  data: {
    startSlot: number;
    day: string;
  };
  className?: string;
  children?: React.ReactNode;
}
export default function TimeSlot({
  id,
  className,
  children,
  data,
}: TimeSlotProps) {
  const { setNodeRef } = useDroppable({
    id,
    data,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(className, 'relative transition-colors duration-200 pr-3')}
    >
      {children}
    </div>
  );
}
