import { Fragment } from 'react/jsx-runtime';
import TimeSlot from './time-slot';
import { Task } from '@/modules/task/stores/slice/task-slice';
import ScheduledTask from '@/modules/task/components/scheduled-task/scheduled-task';
import { cn } from '@ttrak/ui/lib/utils';

interface CalendarGridProps {
  className?: string;
  tasks: Task[];
}
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => i);

export default function CalendarGrid({ tasks }: CalendarGridProps) {
  return (
    <>
      <div className='grid grid-cols-8 border-b border-gray-700'>
        <div className='col-span-1  border-gray-700 relative'></div>
        {days.map((day, index) => (
          <div key={index} className='text-xs text-gray-500 text-center'>
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
          return (
            <>
              <div
                key={day}
                className='col-span-1 border-l border-gray-700 relative'
              >
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
                          key={`${day}-${globalIndex}`}
                          data={data}
                          id={`${day}-${globalIndex}`}
                          className={cn('h-6', {
                            'border-b border-gray-800': quarterIndex % 2 === 1,
                          })}
                        />
                      );
                    })}
                  </Fragment>
                ))}
                {dayTasks.map(task => (
                  <ScheduledTask
                    key={task.id}
                    title={task.title}
                    startSlot={task.startSlot}
                    slotCount={task.slotCount}
                  />
                ))}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
