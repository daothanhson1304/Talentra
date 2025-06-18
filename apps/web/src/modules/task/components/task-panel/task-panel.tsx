import { ArrowLeft, ListFilter } from 'lucide-react';
import TaskList from './task-list';
import { useGetEmployeeState } from '@/modules/employee/hooks/use-get-employee-state';
import { useMemo } from 'react';
import useSetSidebarState from '@/modules/app/sidebar/hooks/use-set-sidebar-state';
import { SidebarTab } from '@/modules/app/sidebar/types';

import CreateTaskPopover from '../create-task-popover';

export default function TaskPanel() {
  return (
    <section className='bg-layer0 p-4 h-full w-full pt-0 max-w-full overflow-x-hidden overflow-y-auto'>
      <div className='flex items-start justify-between items-center gap-8 pb-2 sticky top-0 z-10 bg-layer0 pt-4'>
        <TaskTitle />
        <div className='flex text-primary-foreground justify-end items-center gap-3 flex-1'>
          <ListFilter size={18} />
          <CreateTaskPopover />
        </div>
      </div>
      <TaskList />
    </section>
  );
}

const TaskTitle = () => {
  const { selectedEmployeeId, getEmployeeById } = useGetEmployeeState();
  const { setActiveTab } = useSetSidebarState();
  const employee = useMemo(() => {
    return getEmployeeById(selectedEmployeeId ?? '');
  }, [selectedEmployeeId]);
  return (
    <h2 className='flex items-center gap-2 whitespace-nowrap'>
      <ArrowLeft
        className='bg-layer2 rounded-sm cursor-pointer p-1'
        onClick={() => setActiveTab(SidebarTab.EMPLOYEE)}
      />
      Assigned Tasks - {employee?.name}
    </h2>
  );
};
