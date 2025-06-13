import { SLOT_HEIGHT_PX } from '@/constants/calendar';
import DraftTask from '@/modules/task/components/draft-task';
import ScheduledTask from '@/modules/task/components/scheduled-task';
import { groupOverlappingTasks } from '@/modules/task/utils';
import { cn } from '@ttrak/ui/lib/utils';

import { getDayOfWeek, isSameDay } from '@/modules/calendar/helpers/date';
import useDragDropTask from '@/modules/task/hooks/use-drag-drop-task';
import useTaskStore from '@/modules/task/hooks/use-task-store';
import { currentWeekOffsetSelector } from '../../stores/selector/calendar-selector';
import { useSelector } from 'react-redux';
import HoursOfTheDay from './hours-of-the-day';
import TimeSlotInDay from './time-slot-in-day';

interface CalendarGridProps {
  className?: string;
}

export default function CalendarGrid({
  className,
}: Readonly<CalendarGridProps>) {
  return (
    <div
      className={cn(
        'grid grid-cols-8 border-t border-charcoal-gray',
        className
      )}
    >
      <div className='col-span-1'>
        <HoursOfTheDay />
      </div>
      {Array.from({ length: 7 }, (_, i) => {
        return (
          <div
            className='col-span-1 border-l border-charcoal-gray relative'
            key={i}
          >
            <TimeSlotInDay dayOffset={i} />
            <ScheduledTaskGrid dayOffset={i} />
            <DraftTaskGrid dayOffset={i} />
          </div>
        );
      })}
    </div>
  );
}

const ScheduledTaskGrid = ({ dayOffset }: { dayOffset: number }) => {
  const { tasks } = useTaskStore();
  const currentWeekOffset = useSelector(currentWeekOffsetSelector);
  const day = getDayOfWeek(currentWeekOffset, dayOffset);
  const dayTasks = tasks.filter(task => {
    if (!task.day || !day) return false;
    return isSameDay(task.day, day) && task.scheduled;
  });
  const positionedTasks = groupOverlappingTasks(dayTasks);
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0  rounded-lg overflow-hidden'>
      {positionedTasks.map(task => (
        <ScheduledTask
          key={task.id}
          id={task.id}
          title={task.title}
          startSlot={task.startSlot}
          slotCount={task.slotCount}
          style={{
            top: `${(task.startSlot ?? 0) * SLOT_HEIGHT_PX}px`,
            height: `${task.slotCount * SLOT_HEIGHT_PX}px`,
            left: `${task.left}%`,
            width: `${task.width}%`,
            zIndex: task.zIndex,
          }}
          isFirstInGroup={task.isFirstInGroup}
        />
      ))}
    </div>
  );
};
const DraftTaskGrid = ({ dayOffset }: { dayOffset: number }) => {
  const { draftTask } = useDragDropTask();
  const currentWeekOffset = useSelector(currentWeekOffsetSelector);
  const day = getDayOfWeek(currentWeekOffset, dayOffset);
  if (!draftTask || draftTask.day !== day) return null;
  return (
    <DraftTask
      title={draftTask.title}
      startSlot={draftTask.startSlot}
      slotCount={draftTask.slotCount}
    />
  );
};
