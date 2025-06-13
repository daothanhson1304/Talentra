import CalendarGrid from './calendar-grid';
import CalendarHeader from '../calendar-header/calendar-header';
import ActionToolbar from '../action-toolbar/action-toolbar';

export default function CalendarPanel() {
  return (
    <section className='flex-1 bg-layer1 text-white p-4 h-dvh pt-0 pr-0 relative'>
      <div className='relative'>
        <div className='absolute top-0 right-0 z-10'>
          <ActionToolbar />
        </div>
        <CalendarHeader />
      </div>
      <CalendarGrid className='overflow-auto h-[calc(100vh-96.8px)]' />
    </section>
  );
}
