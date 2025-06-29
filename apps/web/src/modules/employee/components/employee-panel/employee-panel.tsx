import SearchEmployee from './search-employee';
import EmployeeList from './employee-list';

import { useState } from 'react';
import CreateEmployeePopover from '../create-employee-popover';

export default function EmployeePanel() {
  const [filter, setFilter] = useState('');
  return (
    <section className='bg-layer0 p-4 h-full w-full overflow-y-auto pt-0'>
      <div className='sticky top-0 z-10 bg-layer0 pb-2 shadow-sm'>
        <div className='flex justify-between items-center gap-8 pt-4'>
          <h2 className='text-xl font-medium'>Employee</h2>
          <div className='flex text-primary-foreground justify-end items-center gap-3 flex-1'>
            <CreateEmployeePopover />
          </div>
        </div>
        <div className='mt-4'>
          <SearchEmployee onSearch={setFilter} />
        </div>
      </div>
      <EmployeeList filter={filter} />
    </section>
  );
}
