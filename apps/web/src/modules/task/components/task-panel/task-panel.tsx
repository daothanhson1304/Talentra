import { ListFilter } from 'lucide-react';
import useTasks from '../../hooks/useTasks';
import CreateTaskPopover from '../create-task-popover';
import TaskGroup from './task-group';
import { StaffDropdown } from '@/modules/staff/components/staff-dropdown';

export default function TaskPanel() {
  const { tasks } = useTasks();
  return (
    <section className='bg-layer0 p-4 h-full w-full'>
      <div className='flex items-start justify-between items-center gap-8'>
        <StaffDropdown />
        <div className='flex text-primary-foreground items-center gap-3 flex-1'>
          <ListFilter size={18} />
          <CreateTaskPopover />
        </div>
      </div>
      <TaskGroup tasks={tasks} />
    </section>
  );
}
