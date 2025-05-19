import { useDraggable } from '@dnd-kit/core';
import { cn } from '@ttrak/ui/lib/utils';
import { Task } from '../../stores/slice/task-slice';

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
        'flex p-3 rounded-md hover:bg-layer3 items-start gap-2 cursor-pointer transition-all duration-200',
        {
          'opacity-0 pointer-events-none': isHidden,
          'opacity-100': !isHidden,
        }
      )}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div>
        <p className='text-md font-semibold'>🎉 {task.title}</p>
      </div>
    </li>
  );
}
