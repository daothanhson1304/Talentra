import { ListFilter } from 'lucide-react';
import useTasks from '../../hooks/useTasks';
import CreateTaskPopover from '../create-task-popover';
import TaskGroup from './task-group';

export default function TaskPanel() {
  const { tasks } = useTasks();
  return (
    <section className='bg-layer0 p-4 h-full w-full'>
      <div className='flex items-start justify-between'>
        <h2 className='text-lg font-semibold mb-4 text-primary'>Tasks</h2>
        <div className='flex text-primary-foreground items-center gap-3'>
          <ListFilter size={18} />
          <CreateTaskPopover />
        </div>
      </div>
      <TaskGroup tasks={tasks} />
    </section>
  );
}
