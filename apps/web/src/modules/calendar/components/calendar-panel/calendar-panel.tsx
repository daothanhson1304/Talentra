import CalendarGrid from './calendar-grid';
import CalendarHeader from '../calendar-header/calendar-header';
import ActionToolbar from '../action-toolbar/action-toolbar';

export default function CalendarPanel() {
  return (
    <>
      <div className='relative'>
        <div className='absolute top-0 right-0 z-10'>
          <ActionToolbar />
        </div>
        <CalendarHeader />
      </div>
      <div className='overflow-auto h-[calc(100vh-96.8px)]'>
        <CalendarGrid />
      </div>
    </>
  );
}
