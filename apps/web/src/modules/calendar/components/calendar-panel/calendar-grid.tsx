import { SLOT_HEIGHT } from '@/constants/calendar';
import DraftTask from '@/modules/task/components/draft-task';
import ScheduledTask from '@/modules/task/components/scheduled-task';
import { Task } from '@/modules/task/stores/slice/task-slice';
import { cn } from '@ttrak/ui/lib/utils';
import { Fragment } from 'react/jsx-runtime';
import TimeSlot from './time-slot';
import { groupOverlappingTasks } from '@/modules/task/utils';

interface CalendarGridProps {
  className?: string;
  tasks: Task[];
  draftTask: Task | null;
}
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => i);

export default function CalendarGrid({ tasks, draftTask }: CalendarGridProps) {
  return (
    <>
      <div className='grid grid-cols-8 border-b border-gray-700'>
        <div className='col-span-1  border-gray-700 relative'></div>
        {days.map(day => (
          <div key={day} className='text-xs text-gray-500 text-center'>
            {day}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-8 border-t border-gray-700'>
        <div className='col-span-1'>
          {hours.map(h => (
            <div key={h} className='h-24 text-xs text-gray-500'>
              {h === 0
                ? '12 AM'
                : h < 12
                  ? `${h} AM`
                  : h === 12
                    ? '12 PM'
                    : `${h - 12} PM`}
            </div>
          ))}
        </div>
        {days.map(day => {
          const dayTasks = tasks.filter(task => task.day === day);
          const positionedTasks = groupOverlappingTasks(dayTasks);
          return (
            <Fragment key={day}>
              <div className='col-span-1 border-l border-gray-700 relative'>
                {hours.map((_, hourIndex) => (
                  <Fragment key={`${day}-${hourIndex}`}>
                    {[0, 1, 2, 3].map(quarterIndex => {
                      const globalIndex = hourIndex * 4 + quarterIndex;
                      const data = {
                        startSlot: globalIndex,
                        day,
                      };
                      return (
                        <TimeSlot
                          key={`${day}-${hourIndex}-${globalIndex}`}
                          data={data}
                          id={`${day}-${globalIndex}`}
                          className={cn(`h-[${SLOT_HEIGHT}px]`, {
                            'border-b border-gray-800': quarterIndex % 2 === 1,
                          })}
                        ></TimeSlot>
                      );
                    })}
                  </Fragment>
                ))}
                <div className='absolute top-0 left-0 right-0 bottom-0  rounded-lg overflow-hidden'>
                  {positionedTasks.map((task, index) => (
                    <ScheduledTask
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      startSlot={task.startSlot}
                      slotCount={task.slotCount}
                      style={{
                        top: `${(task.startSlot ?? 0) * SLOT_HEIGHT}px`,
                        height: `${task.slotCount * SLOT_HEIGHT}px`,
                        left: `${task.left}%`,
                        width: `${task.width}%`,
                        zIndex: task.zIndex,
                      }}
                      isFirstInGroup={task.isFirstInGroup}
                    />
                  ))}
                </div>

                {draftTask && draftTask.day === day && (
                  <DraftTask
                    title={draftTask.title}
                    startSlot={draftTask.startSlot}
                    slotCount={draftTask.slotCount}
                  />
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
