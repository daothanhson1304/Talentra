import useDragOver from '@/modules/shared/hooks/useDragOver';
import { Task } from '../../stores/slice/task-slice';
import TaskItem from './task-item';

interface TaskGroupProps {
  tasks: Task[];
}
export default function TaskGroup({ tasks }: TaskGroupProps) {
  const { draftTask } = useDragOver();
  return (
    <div className='mb-6'>
      <ul className='task-list space-y-2 overflow-y-auto'>
        {tasks.map((task, idx) => {
          if (task.scheduled) return null;
          return (
            <TaskItem
              key={idx}
              task={task}
              isHidden={!!draftTask && task.id === draftTask.id}
            />
          );
        })}
      </ul>
    </div>
  );
}
