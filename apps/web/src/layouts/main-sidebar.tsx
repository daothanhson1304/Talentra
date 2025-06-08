import useGetSidebarState from '@/modules/app/sidebar/hooks/use-get-sidebar-state';
import { SidebarTab } from '@/modules/app/sidebar/types';
import EmployeePanel from '@/modules/employee/components/employee-panel/employee-panel';
import TaskPanel from '@/modules/task/components/task-panel/task-panel';

export default function MainSidebar() {
  const { activeTab } = useGetSidebarState();

  return (
    <div className='h-full relative'>
      {activeTab === SidebarTab.EMPLOYEE && <EmployeePanel />}
      {activeTab === SidebarTab.TASK && <TaskPanel />}
    </div>
  );
}
