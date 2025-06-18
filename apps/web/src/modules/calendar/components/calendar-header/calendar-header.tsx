import {
  getCurrentWeekDays,
  getDayInfo,
  getMonth,
  getYear,
  isSameDay,
} from '../../helpers/date';
import { useSelector } from 'react-redux';
import {
  currentWeekOffsetSelector,
  currentWeekSelector,
} from '../../stores/selector/calendar-selector';

export default function CalendarHeader() {
  const currentWeekOffset = useSelector(currentWeekOffsetSelector);
  const currentWeek = useSelector(currentWeekSelector);
  const days = getCurrentWeekDays(currentWeekOffset);
  const firstMonthOfWeek = new Date(days[0] ?? '');
  const lastMonthOfWeek = new Date(days[6] ?? '');
  const firstMonth = getMonth(firstMonthOfWeek.toISOString());
  const lastMonth = getMonth(lastMonthOfWeek.toISOString());
  const year = getYear(firstMonthOfWeek.toISOString());

  return (
    <div className='flex flex-col pb-4 gap-6 bg-layer1 pt-1 z-10 border-b border-charcoal-gray'>
      <div className='text-xl font-medium'>
        {firstMonth === lastMonth ? (
          <>
            {firstMonth}
            <span className='text-primary-foreground'> {year}</span>
          </>
        ) : (
          <>
            {firstMonth} - {lastMonth}
            <span className='text-primary-foreground'> {year}</span>
          </>
        )}
      </div>
      <div className='flex'>
        <div
          className='border-charcoal-gray relative flex items-center justify-left text-xs text-primary-foreground'
          style={{ width: '120px' }}
        >
          W {currentWeek + currentWeekOffset}
        </div>
        <div className='grid grid-cols-7 flex-1'>
          {days.map(day => {
            const { weekday, dayNum } = getDayInfo(day);
            const isToday = isSameDay(day, new Date().toISOString());
            return (
              <div
                key={day}
                className='text-base  text-center flex items-center justify-center gap-2'
              >
                {weekday}{' '}
                {isToday ? (
                  <span className='rounded-full bg-primary text-white w-6 h-6 text-sm flex items-center justify-center'>
                    {dayNum}
                  </span>
                ) : (
                  dayNum
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
