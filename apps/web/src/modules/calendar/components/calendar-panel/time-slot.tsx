import { useDroppable } from '@dnd-kit/core';
import { cn } from '@ttrak/ui/lib/utils';

interface TimeSlotProps {
  id: string;

  startSlot: number;
  dayOffset: number;

  className?: string;
  children?: React.ReactNode;
}
export default function TimeSlot({
  id,
  className,
  startSlot,
  dayOffset,
}: Readonly<TimeSlotProps>) {
  // const { setNodeRef } = useDroppable({
  //   id,
  //   data: {
  //     startSlot,
  //     dayOffset,
  //   },
  // });

  console.log('render time slot');

  return (
    <div
      // ref={setNodeRef}
      className={cn(
        className,
        'h-6 relative transition-colors duration-200 pr-3'
      )}
    ></div>
  );
}
