import CreateTaskPopover from '@/modules/task/components/create-task-popover';
import { ListFilter } from 'lucide-react';
import SearchEmployee from './search-employee';
import EmployeeList from './employee-list';

export default function EmployeePanel() {
  return (
    <section className='bg-layer0 p-4 h-full w-full overflow-y-auto pt-0'>
      <div className='sticky top-0 z-10 bg-layer0 pb-2 shadow-sm'>
        <div className='flex items-start justify-between items-center gap-8 pt-4'>
          <h2>Employee</h2>
          <div className='flex text-primary-foreground justify-end items-center gap-3 flex-1'>
            <ListFilter size={18} />
            <CreateTaskPopover />
          </div>
        </div>
        <div className='mt-4'>
          <SearchEmployee
            onSearch={searchTerm => {
              console.log(searchTerm);
            }}
          />
        </div>
      </div>
      <EmployeeList />
    </section>
  );
}
