import TaskItem from './task-item';
import useTaskStore from '../../hooks/use-task-store';

export default function TaskList() {
  const { tasks } = useTaskStore();

  return (
    <div className='mb-6'>
      <ul className='task-list space-y-2'>
        {tasks.map(task => {
          if (task.scheduled) return null;
          return <TaskItem key={task.id} task={task} />;
        })}
      </ul>
    </div>
  );
}
