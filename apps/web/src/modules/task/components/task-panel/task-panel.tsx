import useTasks from '../../hooks/useTasks';
import CreateTaskPopover from '../create-task-popover';
import TaskGroup from './task-group';

export default function TaskPanel() {
  const { tasks } = useTasks();
  return (
    <section className='bg-accent-foreground p-4 h-full w-full'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold mb-4'>Tasks</h2>
        <CreateTaskPopover />
      </div>
      <TaskGroup title='Info' tasks={tasks} />
    </section>
  );
}
