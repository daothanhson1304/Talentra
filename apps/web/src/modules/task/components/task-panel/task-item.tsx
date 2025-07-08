import { TASK_ITEM_HEIGHT, TASK_TITLE_PANEL_HEIGHT } from '@/constants';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '@talentra/types/task';
import { cn } from '@talentra/ui/lib/utils';
import { GripVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface TaskItemProps {
  task: Task;
  isHidden?: boolean;
  index: number;
  className?: string;
}
export default function TaskItem({
  task,
  isHidden,
  index,
  className,
}: Readonly<TaskItemProps>) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: {
      ...task,
      distanceFromTop: index * TASK_ITEM_HEIGHT + TASK_TITLE_PANEL_HEIGHT,
      itemWidth,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  useEffect(() => {
    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth);
    }
  }, [itemRef.current]);

  return (
    <li
      ref={itemRef}
      className={cn(
        'py-2 px-3 rounded-md bg-layer3 transition-all duration-200 list-none',
        {
          'bg-layer2': isHidden,
        },
        className
      )}
    >
      <div
        className={cn('flex items-center gap-2', {
          'w-full h-[40px] rounded-md': isHidden,
        })}
        ref={node => {
          setNodeRef(node);
        }}
      >
        <span
          className='cursor-grab '
          style={style}
          {...listeners}
          {...attributes}
        >
          <GripVertical size={20} className='text-muted-foreground' />
        </span>

        <div className='flex flex-col flex-1 min-w-0'>
          <h3 className='text-sm font-medium whitespace-nowrap truncate w-full'>
            {task.title}
          </h3>
          <p className='text-sm text-muted-foreground truncate w-full'>
            {task.description}
          </p>
        </div>
      </div>
    </li>
  );
}
