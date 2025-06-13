import { Fragment, memo } from 'react';
import TimeSlot from './time-slot';
import { cn } from '@ttrak/ui/lib/utils';

const hours = Array.from({ length: 24 }, (_, i) => i);

interface TimeSlotInDayProps {
  dayOffset: number;
}

const TimeSlotInDay = ({ dayOffset }: TimeSlotInDayProps) => {
  console.log('render time slot in day', dayOffset);
  return (
    <>
      {hours.map((_, hourIndex) => (
        <Fragment key={`${dayOffset}-${hourIndex}`}>
          {[0, 1, 2, 3].map(quarterIndex => {
            const globalIndex = hourIndex * 4 + quarterIndex;

            return (
              <TimeSlot
                key={`${dayOffset}-${hourIndex}-${globalIndex}`}
                dayOffset={dayOffset}
                startSlot={globalIndex}
                id={`${dayOffset}-${globalIndex}`}
                className={cn({
                  'border-b border-charcoal-gray': quarterIndex % 2 === 1,
                })}
              />
            );
          })}
        </Fragment>
      ))}
    </>
  );
};
export default memo(TimeSlotInDay);
