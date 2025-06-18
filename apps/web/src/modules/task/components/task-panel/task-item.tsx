import { useDraggable } from '@dnd-kit/core';
import { Task } from '@ttrak/types/task';
import { cn } from '@ttrak/ui/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface TaskItemProps {
  task: Task;
  isHidden?: boolean;
  index: number;
}
export default function TaskItem({
  task,
  isHidden,
  index,
}: Readonly<TaskItemProps>) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { ...task, distanceFromTop: index * 64 + 48, itemWidth },
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
        'flex py-2 px-3 rounded-md hover:bg-layer3 items-start transition-all duration-200 flex-col',
        {
          'opacity-0 pointer-events-none': isHidden,
          'opacity-100': !isHidden,
        }
      )}
    >
      <div className='flex justify-between items-start w-full'>
        <div
          ref={node => {
            setNodeRef(node);
          }}
          className='cursor-grab'
          style={style}
          {...listeners}
          {...attributes}
        >
          <h3 className='text-sm font-medium whitespace-nowrap'>
            {task.title}
          </h3>
          <p className='text-sm text-muted-foreground whitespace-nowrap'>
            {task.description}
          </p>
        </div>
      </div>
    </li>
  );
}
