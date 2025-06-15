import useTaskStore from '@/modules/task/hooks/use-task-store';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import useCalendar from '@/modules/calendar/hooks/use-calendar';

export default function DragDropProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { createDraggingTask, clearDraggingTask, updateScheduledTask } =
    useTaskStore();
  const { pixelsPerMinute, widthPerDay } = useCalendar();
  const handleDragStart = (event: DragStartEvent) => {
    // console.log('handleDragStart', event);
    createDraggingTask(event.active.id as string);
  };
  const handleDragOver = (event: DragOverEvent) => {
    // dragOverHandler(event);
    console.log('handleDragOver', event);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    // console.log('handleDragEnd', event);
    const { x, y } = event.delta;
    const nextSlot = Math.floor(y / pixelsPerMinute);
    const nextDay = Math.floor(x / widthPerDay);
    updateScheduledTask(event.active.id as string, nextDay, nextSlot);
    clearDraggingTask();
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
