import { ArrowLeft } from 'lucide-react';
import TaskList from './task-list';
import { useGetEmployeeState } from '@/modules/employee/hooks/use-get-employee-state';
import { useMemo } from 'react';
import useSetSidebarState from '@/modules/app/sidebar/hooks/use-set-sidebar-state';
import { SidebarTab } from '@/modules/app/sidebar/types';

import CreateTaskPopover from '../create-task-popover';
import { TASK_TITLE_PANEL_HEIGHT } from '@/constants';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@talentra/ui/components/tooltip';
import useSetEmployeeState from '@/modules/employee/hooks/use-set-employee-state';
import { useGetEmployeesQuery } from '@/modules/employee/stores/api/employee.api';
export default function TaskPanel() {
  return (
    <section className='bg-layer0 p-4 h-full w-full pt-0 max-w-full overflow-x-hidden overflow-y-auto'>
      <div
        className='flex justify-between items-center gap-8 sticky top-0 z-10 bg-layer0 pt-4 pb-4'
        style={{
          height: TASK_TITLE_PANEL_HEIGHT,
        }}
      >
        <TaskTitle />
        <div className='flex text-primary-foreground justify-end items-center gap-3 flex-1'>
          <CreateTaskPopover />
        </div>
      </div>
      <TaskList />
    </section>
  );
}

const TaskTitle = () => {
  const { selectedEmployeeId } = useGetEmployeeState();
  const { setSelectedEmployeeId } = useSetEmployeeState();
  const { data: employees } = useGetEmployeesQuery();

  const { setActiveTab } = useSetSidebarState();
  const employee = useMemo(() => {
    return employees?.find(employee => employee._id === selectedEmployeeId);
  }, [selectedEmployeeId, employees]);
  const handleBack = () => {
    setActiveTab(SidebarTab.EMPLOYEE);
    setSelectedEmployeeId(null);
  };
  return (
    <h2 className='flex items-center gap-2 whitespace-nowrap text-xl font-medium'>
      <Tooltip>
        <TooltipTrigger asChild>
          <ArrowLeft
            className='bg-layer2 rounded-sm cursor-pointer p-1'
            onClick={handleBack}
          />
        </TooltipTrigger>
        <TooltipContent>Employees</TooltipContent>
      </Tooltip>
      {employee?.name}
    </h2>
  );
};
