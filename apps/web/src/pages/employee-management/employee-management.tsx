import Header from './components/header';
import { DataTable } from './components/table';

export default function EmployeeManagement() {
  console.log('EmployeeManagement');
  return (
    <div className='bg-layer1 w-full p-4'>
      <Header />
      <div className='h-[1px] bg-charcoal-gray mt-4' />
      <div className='mt-4'>
        <DataTable />
      </div>
    </div>
  );
}
