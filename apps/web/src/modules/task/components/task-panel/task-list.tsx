import TaskItem from './task-item';
import useTaskStore from '../../hooks/use-task-store';
import { useGetEmployeeState } from '@/modules/employee/hooks/use-get-employee-state';
import { useGetTaskByEmployeeIdQuery } from '../../stores/api/task.api';

export default function TaskList() {
  const { selectedEmployeeId } = useGetEmployeeState();

  const { tasks, draggingTaskId } = useTaskStore();
  useGetTaskByEmployeeIdQuery(selectedEmployeeId ?? '', {
    skip: !selectedEmployeeId,
  });
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
