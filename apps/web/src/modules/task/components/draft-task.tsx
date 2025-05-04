import { cn } from '@ttrak/ui/lib/utils';
import { Task } from '../stores/slice/task-slice';
import { SLOT_HEIGHT } from '@/constants/calendar';

type DraftTaskProps = Pick<Task, 'slotCount' | 'title' | 'startSlot'>;

export default function DraftTask({
  title,
  startSlot,
  slotCount,
}: DraftTaskProps) {
  if (startSlot === null) {
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
      Thả vào đây để tạo task
    </div>
  );
}
