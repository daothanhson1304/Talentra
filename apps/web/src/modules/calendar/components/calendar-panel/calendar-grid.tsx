import ScheduledTask from '@/modules/task/components/scheduled-task';
import { groupOverlappingTasks } from '@/modules/task/utils';
import { cn } from '@ttrak/ui/lib/utils';

import { getDayOfWeek, isSameDay } from '@/modules/calendar/helpers/date';
import useTaskStore from '@/modules/task/hooks/use-task-store';
import { currentWeekOffsetSelector } from '../../stores/selector/calendar-selector';
import { useSelector } from 'react-redux';
import HoursOfTheDay from './hours-of-the-day';
import TimeSlotInDay from './time-slot-in-day';
import { useDroppable } from '@dnd-kit/core';
import { HOURS_IN_DAY_COLUMN_WIDTH } from '@/constants/calendar';
import { memo } from 'react';

export default function CalendarGrid() {
  const { setNodeRef } = useDroppable({
    id: 'calendar-grid',
    disabled: false,
  });

  return (
    <div className='overflow-hidden flex'>
      <div style={{ width: HOURS_IN_DAY_COLUMN_WIDTH }}>
        <HoursOfTheDay />
      </div>
      <div
        ref={node => {
          setNodeRef(node);
        }}
        onMouseOver={e => {
          console.log('mouse over', e);
        }}
        className={cn(
          'grid grid-cols-7 border-t border-charcoal-gray relative flex-1'
        )}
      >
        {Array.from({ length: 7 }, (_, i) => {
          return (
            <div
              className='col-span-1 border-l border-charcoal-gray relative'
              key={i}
            >
              <TimeSlotInDay dayOffset={i} />
              <ScheduledTaskGrid dayOffset={i} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ScheduledTaskGrid = memo(({ dayOffset }: { dayOffset: number }) => {
  const { tasks } = useTaskStore();
  const currentWeekOffset = useSelector(currentWeekOffsetSelector);
  const day = getDayOfWeek(currentWeekOffset, dayOffset);
  const dayTasks = tasks.filter(task => {
    if (!task.day || !day) return false;
    return isSameDay(task.day, day) && task.scheduled;
  });
  const positionedTasks = groupOverlappingTasks(dayTasks);
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0  rounded-lg '>
      {positionedTasks.map(task => (
        <ScheduledTask
          key={task.id}
          id={task.id}
          title={task.title}
          startSlot={task.startSlot}
          slotCount={task.slotCount}
          isFirstInGroup={task.isFirstInGroup}
        />
      ))}
    </div>
  );
});
