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
  console.log(employees);
  if (isLoading) return <EmployeeListSkeleton />;
  if (!isLoading && employees?.length === 0) {
    return (
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <img src='/images/empty.webp' alt='empty' className='w-1/2' />
        <p className='text-sm text-gray-500'>No employees found</p>
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-2'>
      {employees
        ?.filter(employee =>
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
