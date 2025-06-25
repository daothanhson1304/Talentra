import EmployeeItem from './employee-item';
import useSetEmployeeState from '../../hooks/use-set-employee-state';
import { SidebarTab } from '@/modules/app/sidebar/types';
import useSetSidebarState from '@/modules/app/sidebar/hooks/use-set-sidebar-state';
import { useGetEmployeesQuery } from '../../stores/api/employee.api';
import EmployeeListSkeleton from './employee-list-skeleton';
interface EmployeeListProps {
  filter: string;
}

export default function EmployeeList({ filter }: Readonly<EmployeeListProps>) {
  const { data: employees, isLoading } = useGetEmployeesQuery();
  const { setSelectedEmployeeId } = useSetEmployeeState();
  const { setActiveTab } = useSetSidebarState();
  const handleSelectEmployee = (id: string) => {
    setSelectedEmployeeId(id);
    setActiveTab(SidebarTab.TASK);
  };

  if (isLoading) return <EmployeeListSkeleton />;
  if (!employees) return null;
  return (
    <div className='flex flex-col gap-2'>
      {employees
        .filter(employee =>
          employee.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map(employee => (
          <EmployeeItem
            key={employee._id}
            employee={employee}
            onSelect={handleSelectEmployee}
          />
        ))}
    </div>
  );
}
