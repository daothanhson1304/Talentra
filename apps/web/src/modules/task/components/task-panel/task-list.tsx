import TaskItem from './task-item';
import useTaskStore from '../../hooks/use-task-store';

export default function TaskList() {
  const { tasks } = useTaskStore();
  const { draggingTaskId } = useTaskStore();

  return (
    <div className='mb-6'>
      <ul className='task-list space-y-2'>
        {tasks
          .filter(task => !task.scheduled)
          .map((task, index) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                isHidden={task.id === draggingTaskId}
                index={index}
              />
            );
          })}
      </ul>
    </div>
  );
}
