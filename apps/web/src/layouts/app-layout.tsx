import CalendarPanel from '@/modules/calendar/components/calendar-panel';
import DndKitProvider from '@/modules/dnd-kit/components/dnd-kit-provider';
import { TaskPanel } from '@/modules/task/components/task-panel';
import { MainSidebar } from './main-sidebar';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@ttrak/ui/components/resizable';

export default function AppLayout() {
  return (
    <div className='flex h-screen'>
      <MainSidebar />
      <DndKitProvider>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={25} className='h-full' maxSize={40}>
            <TaskPanel />
          </ResizablePanel>
          <ResizableHandle className='bg-secondary' />
          <ResizablePanel>
            <CalendarPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </DndKitProvider>
    </div>
  );
}
