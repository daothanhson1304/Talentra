import { SLOT_HEIGHT } from '@/constants/calendar';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@ttrak/ui/lib/utils';
import { useEffect, useRef, useState } from 'react';
import useTasks from '../hooks/useTasks';
import { Task } from '../stores/slice/task-slice';

export type ScheduledTaskProps = Pick<
  Task,
  'id' | 'slotCount' | 'title' | 'startSlot'
> & {
  style?: React.CSSProperties;
  isFirstInGroup?: boolean;
};

export default function ScheduledTask({
  title,
  id,
  startSlot,
  slotCount,
  isFirstInGroup,
  style: externalStyle,
}: ScheduledTaskProps) {
  const [isResizing, setIsResizing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { getTaskById, draftTask, updateTaskSlotCount } = useTasks();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: getTaskById(id),
    disabled: isResizing,
  });

  const style = {
    top: `${(startSlot ?? 0) * SLOT_HEIGHT}px`,
    height: `${slotCount * SLOT_HEIGHT}px`,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    ...externalStyle,
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  const clearResize = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const offsetY = e.clientY - rect.top;
      const newSlotCount = Math.max(1, Math.round(offsetY / SLOT_HEIGHT));
      updateTaskSlotCount(id, newSlotCount);
    };

    const handleMouseUp = () => {
      clearResize();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  if (startSlot === null) return null;

  return (
    <div
      className={cn(
        'absolute z-10 bg-blue-500 text-white text-xs rounded p-1 transition-opacity duration-100',
        {
          'opacity-0 pointer-events-none': draftTask?.id === id,
          'opacity-100': !draftTask,
          'cursor-move': !isResizing,
          'border-l-1 border-white': !isFirstInGroup,
        }
      )}
      style={style}
    >
      <div
        className='w-full h-full'
        ref={node => {
          setNodeRef(node);
          ref.current = node;
        }}
        {...(!isResizing ? listeners : {})}
        {...attributes}
      >
        {title}
      </div>
      <div
        className='absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize'
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
