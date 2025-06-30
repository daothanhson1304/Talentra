import CalendarPanel, {
  CalendarPanelCalculation,
} from '@/modules/calendar/components/calendar-panel';
import DragDropProvider from '@/modules/app/drag-drop/components/drag-drop-provider';
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from '@talentra/ui/components/resizable';
import MainSidebar from '@/layouts/main-sidebar';

export default function Home() {
  return (
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
  );
}
