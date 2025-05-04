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
        'flex items-start gap-2 cursor-pointer transition-opacity duration-300',
        {
          'opacity-0 pointer-events-none': isHidden,
          'opacity-100': !isHidden,
        }
      )}
      style={style}
      {...listeners}
      {...attributes}
    >
      <input type='checkbox' className='mt-1' />
      <div>
        <p className='text-sm'>🎉 {task.title}</p>
        <div className='text-xs text-primary'>
          📅 Tomorrow · ⏱ 30m · 📥 Inbox
        </div>
      </div>
    </li>
  );
}
