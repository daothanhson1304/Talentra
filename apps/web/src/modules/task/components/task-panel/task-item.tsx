import { useDraggable } from '@dnd-kit/core';
import { cn } from '@ttrak/ui/lib/utils';

interface Task {
  title: string;
  id: string;
}
export default function TaskItem({ title, id }: Task) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
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
        'flex items-start gap-2 cursor-pointer transition-opacity duration-500',
        {
          // 'opacity-0 pointer-events-none': !!overId && activeId === title,
          // 'opacity-100': !overId || activeId !== title,
        }
      )}
      style={style}
      {...listeners}
      {...attributes}
    >
      <input type='checkbox' className='mt-1' />
      <div>
        <p className='text-sm'>🎉 {title}</p>
        <div className='text-xs text-gray-400'>
          📅 Tomorrow · ⏱ 30m · 📥 Inbox
        </div>
      </div>
    </li>
  );
}
