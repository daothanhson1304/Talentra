import { useEffect, useRef } from 'react';
import useCalendar from '../../hooks/use-calendar';
import {
  HOURS_IN_DAY_COLUMN_WIDTH,
  SCROLLBAR_WIDTH,
} from '@/constants/calendar';

const CalendarPanelCalculation = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setWidthPerDay } = useCalendar();

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setWidthPerDay(
          (entry.contentRect.width -
            HOURS_IN_DAY_COLUMN_WIDTH -
            SCROLLBAR_WIDTH) /
            7
        );
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <section
      ref={containerRef}
      className='flex-1 bg-layer1 text-white h-dvh relative pl-4 relative z-5'
    >
      {children}
    </section>
  );
};

export default CalendarPanelCalculation;
