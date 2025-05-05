import useTasks from '@/modules/task/hooks/useTasks';
import CalendarGrid from './calendar-grid';
import CalendarHeader from './calendar-header';
import useDragOver from '@/modules/shared/hooks/useDragOver';

export default function CalendarPanel() {
  const { tasks } = useTasks();
  const { draftTask } = useDragOver();
  return (
    <section className='flex-1 bg-layer1 text-white p-4 h-dvh overflow-auto'>
      <CalendarHeader />
      <CalendarGrid tasks={tasks} draftTask={draftTask} />
    </section>
  );
}
