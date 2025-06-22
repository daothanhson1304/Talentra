import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useRef, useState } from 'react';
import useCalendar from '../../hooks/use-calendar';
import ActionToolbar from '../action-toolbar/action-toolbar';
import CalendarHeader from '../calendar-header/calendar-header';
import CalendarGrid from './calendar-grid';

export default function CalendarPanel() {
  return (
    <>
      <div className='relative'>
        <div className='absolute top-0 right-0 z-10'>
          <ActionToolbar />
        </div>
        <CalendarHeader />
      </div>
      <CalendarScrollContainer>
        <CalendarGrid />
      </CalendarScrollContainer>
    </>
  );
}

const CalendarScrollContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const calendarPanelRef = useRef<HTMLDivElement>(null);
  const { setScrollTop, scrollTop } = useCalendar();
  const [rawScrollTop, setRawScrollTop] = useState(scrollTop);
  const debouncedScrollTop = useDebounce(rawScrollTop, 100);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setRawScrollTop(e.currentTarget.scrollTop);
  };

  useEffect(() => {
    setScrollTop(debouncedScrollTop);
  }, [debouncedScrollTop]);

  useEffect(() => {
    if (calendarPanelRef.current) {
      calendarPanelRef.current.scrollTop = scrollTop;
    }
  }, []);
  return (
    <div
      className='overflow-auto h-[calc(100vh-96.8px)]'
      ref={calendarPanelRef}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};
