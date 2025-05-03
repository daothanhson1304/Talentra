import useTasks from '@/modules/task/hooks/useTasks';
import CalendarGrid from './calendar-grid';
import CalendarHeader from './calendar-header';

export default function CalendarPanel() {
  const { tasks } = useTasks();
  return (
    <section className='flex-1 bg-black text-white p-4 h-dvh overflow-auto'>
      <CalendarHeader />
      <CalendarGrid tasks={tasks} />
    </section>
  );
}
