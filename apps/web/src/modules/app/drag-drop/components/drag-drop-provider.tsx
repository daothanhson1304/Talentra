import { DndContext, DragMoveEvent } from '@dnd-kit/core';
import useDragDrop from '../hooks/use-drag-drop';
import DragOverlayContent from './drag-overlay-content';

export default function DragDropProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleDragStart, handleDragOver, handleDragEnd } = useDragDrop();

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlayContent />
    </DndContext>
  );
}
