import { EmployeeProfile } from './components/employee-profile';
import { HeaderStats, TasksTable } from './components/task-table';

export default function EmployeeDetail() {
  return (
    <div className='flex  lg:grid-cols-3 gap-6 p-6 bg-layer1 min-h-screen w-full'>
      {/* Left side: Work info + tasks */}

      {/* Right side: Employee Profile */}
      <div>
        <EmployeeProfile />
      </div>
      <div className='flex-1 space-y-6'>
        <HeaderStats />
        <TasksTable />
      </div>
    </div>
  );
}
