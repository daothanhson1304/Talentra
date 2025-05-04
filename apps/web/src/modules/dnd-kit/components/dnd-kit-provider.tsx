import useDragOver from '@/modules/shared/hooks/useDragOver';
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
  const { scheduleTask, updateScheduledTask } = useTasks();
  const { dragOverHandler, clearDraftState } = useDragOver();
  const handleDragStart = (event: DragStartEvent) => {};
  const handleDragOver = (event: DragOverEvent) => {
    dragOverHandler(event);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active) return;
    if (active.data.current?.scheduled) {
      updateScheduledTask(
        active.id as string,
        over.data.current?.day as string,
        over.data.current?.startSlot as number
      );
    } else {
      scheduleTask(
        active.id as string,
        over?.data.current?.day as string,
        over?.data.current?.startSlot as number
      );
    }

    clearDraftState();
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
