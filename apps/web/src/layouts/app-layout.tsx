import DndKitProvider from '@/modules/dnd-kit/components/dnd-kit-provider';
import { TaskPanel } from '@/modules/task/components/task-panel';
import { MainSidebar } from './main-sidebar';
import CalendarPanel from '@/modules/calendar/components/calendar-panel';

export default function AppLayout() {
  return (
    <div className='flex h-screen'>
      <MainSidebar />
      <DndKitProvider>
        <TaskPanel />
        <CalendarPanel />
      </DndKitProvider>
    </div>
  );
}
