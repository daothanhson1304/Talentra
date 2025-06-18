import { memo } from 'react';
import { formatHour } from '../../helpers/date';

const hours = Array.from({ length: 24 }, (_, i) => i);

const Timeline = () => {
  return (
    <>
      {hours.map(h => (
        <div key={h} className='h-24 text-xs text-primary-foreground'>
          {formatHour(h)}
        </div>
      ))}
    </>
  );
};
export default memo(Timeline);
