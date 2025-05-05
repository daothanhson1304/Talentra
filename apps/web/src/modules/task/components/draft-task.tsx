import { cn } from '@ttrak/ui/lib/utils';
import { Task } from '../stores/slice/task-slice';
import { SLOT_DURATION_MINUTES, SLOT_HEIGHT_PX } from '@/constants/calendar';
import { MoveRight } from 'lucide-react';

type DraftTaskProps = Pick<Task, 'slotCount' | 'title' | 'startSlot'>;

export default function DraftTask({
  title,
  startSlot,
  slotCount,
}: DraftTaskProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Đổi 0 thành 12 cho định dạng 12 giờ
    return `${formattedHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  // Tính thời gian bắt đầu và kết thúc
  const startTime = formatTime(startSlot * SLOT_DURATION_MINUTES);
  const endTime = formatTime((startSlot + slotCount) * SLOT_DURATION_MINUTES);

  if (startSlot === null) {
    return null;
  }
  return (
    <div
      className={cn(
        'absolute overflow-hidden left-0 right-0 bg-layer1 border border-aqua-breeze text-white text-xs rounded p-1 w-full'
      )}
      style={{
        top: `${startSlot * SLOT_HEIGHT_PX}px`,
        height: `${slotCount * SLOT_HEIGHT_PX}px`,
      }}
    >
      <div className='w-full h-full flex items-start gap-2 cursor-pointer'>
        <div className='h-full w-1 bg-aqua-breeze rounded-sm'></div>
        <div className='flex-1 flex flex-col gap-1.5 h-full'>
          {slotCount > 1 && (
            <p className='text-xs flex items-start gap-1'>
              <span>{startTime}</span>
              <MoveRight size={12} />
              <span>{endTime}</span>
            </p>
          )}
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}
