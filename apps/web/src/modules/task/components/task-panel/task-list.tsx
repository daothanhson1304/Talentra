import TaskItem from './task-item';
import useTaskStore from '../../hooks/use-task-store';
import { useGetEmployeeState } from '@/modules/employee/hooks/use-get-employee-state';
import { useGetTaskByEmployeeIdQuery } from '../../stores/api/task.api';
import TaskItemSkeleton from './task-item-skeleton';

export default function TaskList() {
  const { selectedEmployeeId } = useGetEmployeeState();

  const { tasks, draggingTaskId } = useTaskStore();
  const { isLoading } = useGetTaskByEmployeeIdQuery(selectedEmployeeId ?? '', {
    skip: !selectedEmployeeId,
  });
  if (isLoading)
    return (
      <div className='mb-6'>
        <ul className='task-list space-y-2'>
          {Array.from({ length: 10 }).map((_, index) => (
            <TaskItemSkeleton key={index} />
          ))}
        </ul>
      </div>
    );
  else if (!isLoading && tasks?.filter(task => !task.scheduled)?.length === 0)
    return (
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <img src='/images/empty.webp' alt='empty' className='w-1/2' />
        <p className='text-sm text-gray-500'>No tasks found</p>
      </div>
    );
  if (!selectedEmployeeId || !tasks) return null;

  return (
    <div className='mb-6'>
      <ul className='task-list space-y-2'>
        {tasks
          .filter(task => !task.scheduled)
          .map((task, index) => {
            return (
              <TaskItem
                key={task._id}
                task={task}
                isHidden={task._id === draggingTaskId}
                index={index}
              />
            );
          })}
      </ul>
    </div>
  );
}
