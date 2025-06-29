import { useDraggable } from '@dnd-kit/core';
import { cn } from '@talentra/ui/lib/utils';
import { useEffect, useRef, useState } from 'react';
import useTaskStore from '../hooks/use-task-store';

import { MoveRight } from 'lucide-react';
import { Task } from '@talentra/types/task';
import useCalendar from '@/modules/calendar/hooks/use-calendar';

export type ScheduledTaskProps = Pick<
  Task,
  '_id' | 'slotCount' | 'title' | 'startSlot'
> & {
  style?: React.CSSProperties;
  isFirstInGroup?: boolean;
  className?: string;
};

export default function ScheduledTask({
  title,
  _id,
  startSlot,
  slotCount,
  className,
}: ScheduledTaskProps) {
  const [isResizing, setIsResizing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { getTaskById, updateTaskSlotCount } = useTaskStore();
  const { snappedMinutes, pixelsPerMinute } = useCalendar();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: _id,
    data: getTaskById(_id),
    disabled: isResizing,
  });
  const verticalSlotOffset = Math.floor((transform?.y ?? 0) / pixelsPerMinute);

  const style = {
    top: `${(startSlot ?? 0) * pixelsPerMinute}px`,
    height: `${slotCount * pixelsPerMinute}px`,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  const startTime = formatTime(
    (startSlot + verticalSlotOffset) * snappedMinutes
  );
  const endTime = formatTime(
    (startSlot + verticalSlotOffset + slotCount) * snappedMinutes
  );

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
      const newSlotCount = Math.max(1, Math.round(offsetY / pixelsPerMinute));
      updateTaskSlotCount(_id, newSlotCount);
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
  }, [isResizing, pixelsPerMinute]);

  if (startSlot === null) return null;

  return (
    <div
      className={cn(
        'absolute z-10 overflow-hidden bg-layer1 border border-aqua-breeze text-white text-xs rounded p-1 transition-opacity duration-100',
        {
          'cursor-pointer': !isResizing,
        },
        className
      )}
      style={style}
    >
      <div
        className='w-full h-full flex items-start gap-2 cursor-grab'
        ref={node => {
          setNodeRef(node);
          ref.current = node;
        }}
        {...(!isResizing ? listeners : {})}
        {...attributes}
      >
        <div className='h-full w-1 bg-aqua-breeze rounded-sm'></div>
        <div className='flex-1 flex flex-col gap-1.5 h-full'>
          {slotCount > 1 && (
            <p className='text-xs flex items-start gap-1'>
              <span>{startTime}</span>
              <MoveRight size={12} />
              <span>{endTime}</span>
            </p>
          )}
          <p>{title}</p>
        </div>
      </div>
      <div
        className='absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize'
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
