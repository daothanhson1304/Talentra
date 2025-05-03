import useTasks from '@/modules/task/hooks/useTasks';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';

export default function DndKitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scheduleTask } = useTasks();
  const handleDragStart = (event: DragStartEvent) => {
    console.log('Drag started:', event);
  };
  const handleDragOver = (event: DragOverEvent) => {
    console.log('Drag over:', event);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    console.log('Drag ended:', event);
    scheduleTask(
      event.active.id as string,
      event.over?.data.current?.day as string,
      event.over?.data.current?.startSlot as number
    );
  };
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContext>
  );
}
