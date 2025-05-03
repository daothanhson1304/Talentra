import { cn } from '@ttrak/ui/lib/utils';
import { Task } from '../../stores/slice/task-slice';

type ScheduledTaskProps = Pick<Task, 'slotCount' | 'title' | 'startSlot'>;

export default function ScheduledTask({
  title,
  startSlot,
  slotCount,
}: ScheduledTaskProps) {
  const SLOT_HEIGHT = 24; // px, mỗi slot cao 24px (tùy theo thiết kế)
  if (!startSlot) {
    return null;
  }
  return (
    <div
      className={cn(
        'absolute left-0 right-0 bg-blue-500 text-white text-xs rounded p-1 w-full'
      )}
      style={{
        top: `${startSlot * SLOT_HEIGHT}px`,
        height: `${slotCount * SLOT_HEIGHT}px`,
      }}
    >
      {title}
    </div>
  );
}
