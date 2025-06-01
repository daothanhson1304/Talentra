import useTaskStore from "@/modules/task/hooks/use-task-store";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import useDragDropTask from "../../../task/hooks/use-drag-drop-task.js";

export default function DragDropProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scheduleTask, updateScheduledTask } = useTaskStore();
  const { dragOverHandler, clearDraftState } = useDragDropTask();
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
        over.data.current?.startSlot as number,
      );
    } else {
      scheduleTask(
        active.id as string,
        over?.data.current?.day as string,
        over?.data.current?.startSlot as number,
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
