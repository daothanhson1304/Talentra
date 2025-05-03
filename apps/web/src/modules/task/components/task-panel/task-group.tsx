import { Task } from '../../stores/slice/task-slice';
import TaskItem from './task-item';

interface TaskGroupProps {
  title: string;
  tasks: Task[];
}
export default function TaskGroup({ title, tasks }: TaskGroupProps) {
  return (
    <div className='mb-6'>
      <h3 className='text-sm font-medium mb-2'>▶ {title}</h3>
      <ul className='space-y-2'>
        {tasks.map((task, idx) => {
          if (task.scheduled) return null;
          return <TaskItem key={idx} id={task.id} title={task.title} />;
        })}
      </ul>
    </div>
  );
}
