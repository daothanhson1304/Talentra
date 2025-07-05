import { useState } from 'react';
import EmployeeProfile from './components/employee-profile';
import TasksTable from './components/task-table';
import { EmployeeHeader } from './components/employee-header';
import { useGetTaskByEmployeeIdAndMonthQuery } from '@/modules/task/stores/api/task.api';
import { useParams } from 'react-router';
import { useGetEmployeeByIdQuery } from '@/modules/employee/stores/api/employee.api';
import EmployeeProfileSkeleton from './components/employee-profile-skeleton';

export default function EmployeeDetail() {
  const [selectedMonth, setSelectedMonth] = useState('2025-07');
  const employeeId = useParams().id;
  console.log(employeeId);

  const { data } = useGetTaskByEmployeeIdAndMonthQuery({
    employeeId: employeeId ?? '',
    month: selectedMonth.split('-')[1] ?? '',
    year: selectedMonth.split('-')[0] ?? '',
  });

  const { data: employee, isFetching } = useGetEmployeeByIdQuery(
    employeeId ?? ''
  );

  const totalHours = (
    ((data?.tasks.reduce((acc, task) => acc + task.slotCount, 0) ?? 0) * 5) /
    60
  ).toFixed(2);

  return (
    <div className='flex lg:grid-cols-3 gap-6 p-6 bg-layer1 min-h-screen w-full h-full'>
      {isFetching ? (
        <div className='flex-shrink-0 w-full max-w-sm min-w-[280px] h-full'>
          <EmployeeProfileSkeleton />
        </div>
      ) : (
        <div className='flex-shrink-0 w-full max-w-sm min-w-[280px] h-full'>
          {employee && <EmployeeProfile employeeProfile={employee} />}
        </div>
      )}
      <div className='space-y-6 flex-1'>
        <EmployeeHeader
          selectedMonth={selectedMonth}
          onChangeMonth={setSelectedMonth}
        />
        <HeaderStats
          totalHours={totalHours}
          totalSalary={employee?.salary ?? 0}
          statistics={
            data?.statistics ?? {
              totalTasks: 0,
              completedTasks: 0,
              inProgressTasks: 0,
              cancelledTasks: 0,
              completionRate: '',
              pendingTasks: 0,
            }
          }
        />
        <TasksTable tasks={data?.tasks ?? []} />
      </div>
    </div>
  );
}

export function HeaderStats({
  totalHours,
  statistics,
  totalSalary,
}: Readonly<{
  totalHours: string;
  totalSalary: number;
  statistics: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    inProgressTasks: number;
    cancelledTasks: number;
    completionRate: string;
  };
}>) {
  return (
    <div className='rounded-xl bg-layer2 p-6 shadow-md space-y-6'>
      <div className='text-2xl font-semibold'>
        {totalHours} hrs / ${Math.round(totalSalary)}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-medium'>
        <div>
          <p className='text-yellow-600'>Work day</p>
          <div
            className='bg-yellow-200 h-2 rounded mt-1 w-full'
            style={{ width: '80%' }}
          />
          <p className='mt-1'>{totalHours} hrs</p>
        </div>

        <div>
          <p className='text-blue-600'>Total Tasks This Month</p>
          <div
            className='bg-blue-200 h-2 rounded mt-1 w-full'
            style={{ width: '100%' }}
          />
          <p className='mt-1'>{statistics.totalTasks} tasks</p>
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
        <div>
          <p className='text-muted-foreground'>Completed</p>
          <p className='text-lg font-medium text-green-600'>
            {statistics.completedTasks}
          </p>
        </div>
        <div>
          <p className='text-muted-foreground'>In Progress</p>
          <p className='text-lg font-medium text-yellow-500'>
            {statistics.inProgressTasks}
          </p>
        </div>
        <div>
          <p className='text-muted-foreground'>Overdue</p>
          <p className='text-lg font-medium text-red-600'>
            {statistics.cancelledTasks}
          </p>
        </div>
        <div>
          <p className='text-muted-foreground'>Completion Rate</p>
          <p className='text-lg font-medium text-blue-500'>
            {statistics.completionRate}
          </p>
        </div>
      </div>
    </div>
  );
}
