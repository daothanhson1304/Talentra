import { useDraggable } from '@dnd-kit/core';
import { Task } from '@ttrak/types/task';
import { cn } from '@ttrak/ui/lib/utils';

interface TaskItemProps {
  task: Task;
  isHidden?: boolean;
}
export default function TaskItem({ task, isHidden }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <li
      ref={setNodeRef}
      className={cn(
        'flex py-2 px-3 rounded-md hover:bg-layer3 items-start cursor-pointer transition-all duration-200 flex-col',
        {
          'opacity-0 pointer-events-none': isHidden,
          'opacity-100': !isHidden,
        }
      )}
      style={style}
      {...listeners}
      {...attributes}
    >
      <h3 className='text-sm font-medium'>{task.title}</h3>
      <p className='text-sm text-muted-foreground'>{task.description}</p>
    </li>
  );
}
