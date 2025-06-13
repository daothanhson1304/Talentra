import useTaskStore from '@/modules/task/hooks/use-task-store';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import useDragDropTask from '../../../task/hooks/use-drag-drop-task.js';
import { currentWeekOffsetSelector } from '@/modules/calendar/stores/selector/calendar-selector.js';
import { useSelector } from 'react-redux';
import { getDayOfWeek } from '@/modules/calendar/helpers/date.js';

export default function DragDropProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scheduleTask, updateScheduledTask } = useTaskStore();
  const { dragOverHandler, clearDraftState } = useDragDropTask();
  const currentWeekOffset = useSelector(currentWeekOffsetSelector);
  const handleDragStart = (event: DragStartEvent) => {};
  const handleDragOver = (event: DragOverEvent) => {
    dragOverHandler(event);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active) return;
    const day = getDayOfWeek(
      currentWeekOffset,
      over.data.current?.dayOffset as number
    ) as string;
    if (active.data.current?.scheduled) {
      updateScheduledTask(
        active.id as string,
        day,
        over.data.current?.startSlot as number
      );
    } else {
      scheduleTask(
        active.id as string,
        day,
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
