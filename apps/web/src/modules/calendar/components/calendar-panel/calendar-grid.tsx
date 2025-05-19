import { SLOT_HEIGHT_PX } from '@/constants/calendar';
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
      <div className='grid grid-cols-8 border-b border-charcoal-gray'>
        <div className='col-span-1  border-charcoal-gray relative'></div>
        {days.map(day => (
          <div key={day} className='text-base  text-center'>
            {day}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-8 border-t border-charcoal-gray'>
        <div className='col-span-1'>
          {hours.map(h => (
            <div key={h} className='h-24 text-xs text-primary-foreground'>
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
              <div className='col-span-1 border-l border-charcoal-gray relative'>
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
                          className={cn({
                            'border-b border-charcoal-gray':
                              quarterIndex % 2 === 1,
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
