import EmployeeItem from './employee-item';
import { useGetEmployeeState } from '../../hooks/use-get-employee-state';
import useSetEmployeeState from '../../hooks/use-set-employee-state';
import { SidebarTab } from '@/modules/app/sidebar/types';
import useSetSidebarState from '@/modules/app/sidebar/hooks/use-set-sidebar-state';

export default function EmployeeList() {
  const { employees } = useGetEmployeeState();
  const { setSelectedEmployeeId } = useSetEmployeeState();
  const { setActiveTab } = useSetSidebarState();
  const handleSelectEmployee = (id: string) => {
    setSelectedEmployeeId(id);
    setActiveTab(SidebarTab.TASK);
  };
  return (
    <div className='flex flex-col gap-2'>
      {employees.map(employee => (
        <EmployeeItem
          key={employee.id}
          employee={employee}
          onSelect={handleSelectEmployee}
        />
      ))}
    </div>
  );
}
