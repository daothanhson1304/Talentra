import Header from './components/header';
import { EmployeeTable } from './components/employee-table';

export default function EmployeeList() {
  return (
    <div className='bg-layer1 w-full p-4'>
      <Header />
      <div className='h-[1px] bg-charcoal-gray mt-4' />
      <div className='mt-4'>
        <EmployeeTable />
      </div>
    </div>
  );
}
