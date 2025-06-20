import CalendarPanel, {
  CalendarPanelCalculation,
} from '@/modules/calendar/components/calendar-panel';
import DragDropProvider from '@/modules/app/drag-drop/components/drag-drop-provider';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@ttrak/ui/components/resizable';

import AppSidebar from './app-sidebar';
import MainSidebar from './main-sidebar';

export default function AppLayout() {
  return (
    <div className='flex h-screen'>
      <AppSidebar />
      <DragDropProvider>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={25} className='h-full' maxSize={40}>
            <MainSidebar />
          </ResizablePanel>
          <ResizableHandle className='bg-secondary' />
          <ResizablePanel>
            <CalendarPanelCalculation>
              <CalendarPanel />
            </CalendarPanelCalculation>
          </ResizablePanel>
        </ResizablePanelGroup>
      </DragDropProvider>
    </div>
  );
}
