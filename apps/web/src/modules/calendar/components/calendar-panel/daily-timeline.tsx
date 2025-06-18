import { Fragment, memo } from 'react';
import TimeSlot from './time-slot';

const hours = Array.from({ length: 24 }, (_, i) => i);

interface DailyTimelineProps {
  dayOffset: number;
}

const DailyTimeline = ({ dayOffset }: DailyTimelineProps) => {
  return (
    <>
      {hours.map((_, hourIndex) => (
        <Fragment key={`${dayOffset}-${hourIndex}`}>
          {[0, 1].map(quarterIndex => {
            return (
              <TimeSlot
                key={quarterIndex}
                className='border-b border-charcoal-gray'
              />
            );
          })}
        </Fragment>
      ))}
    </>
  );
};
export default memo(DailyTimeline);
