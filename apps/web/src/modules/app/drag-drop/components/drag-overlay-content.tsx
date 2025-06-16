import { DragOverlay } from '@dnd-kit/core';
import useTaskStore from '@/modules/task/hooks/use-task-store';
import TaskItem from '@/modules/task/components/task-panel/task-item';
import useDragDrop from '../hooks/use-drag-drop';

export default function DragOverlayContent() {
  const { draggingTask } = useTaskStore();
  const { isDraggingOnCalendar } = useDragDrop();
  if (!draggingTask || draggingTask.scheduled || isDraggingOnCalendar)
    return null;
  return <DragOverlay>{<TaskItem task={draggingTask} />}</DragOverlay>;
}
