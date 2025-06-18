import { DragOverlay } from '@dnd-kit/core';
import useTaskStore from '@/modules/task/hooks/use-task-store';
import TaskItem from '@/modules/task/components/task-panel/task-item';
import useDragDrop from '../hooks/use-drag-drop';
import ScheduledTask from '@/modules/task/components/scheduled-task';

export default function DragOverlayContent() {
  const { draggingTask } = useTaskStore();
  const { isDragOver } = useDragDrop();
  if (!draggingTask || draggingTask.scheduled) return null;
  return (
    <DragOverlay>
      {isDragOver ? (
        <ScheduledTask
          title={draggingTask.title}
          id='dragging-task'
          startSlot={0}
          slotCount={6}
        />
      ) : (
        <TaskItem task={draggingTask} index={0} />
      )}
    </DragOverlay>
  );
}
