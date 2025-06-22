import { TASK_ITEM_HEIGHT, TASK_TITLE_PANEL_HEIGHT } from '@/constants';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '@ttrak/types/task';
import { cn } from '@ttrak/ui/lib/utils';
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
    id: task.id,
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
        'flex py-2 px-3 rounded-md bg-layer3 items-start transition-all duration-200 flex-col',
        {
          'bg-layer2': isHidden,
        },
        className
      )}
    >
      <div className='flex justify-between items-start w-full'>
        <div
          ref={node => {
            setNodeRef(node);
          }}
          className={cn('cursor-grab flex items-center gap-2', {
            'w-full h-[40px] rounded-md': isHidden,
          })}
          style={style}
          {...listeners}
          {...attributes}
        >
          {!isHidden && (
            <>
              <GripVertical size={20} className='text-muted-foreground' />

              <div>
                <h3 className='text-sm font-medium whitespace-nowrap'>
                  {task.title}
                </h3>
                <p className='text-sm text-muted-foreground whitespace-nowrap'>
                  {task.description}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
