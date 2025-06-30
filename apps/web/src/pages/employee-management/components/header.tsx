import { Button } from '@talentra/ui/components/button';
import { PlusIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className='flex justify-between items-center'>
      <h2 className='text-xl font-medium'>Employee Management</h2>
      <div className='flex items-center gap-2'>
        <Button variant='outline'>
          <PlusIcon className='w-4 h-4' />
          Add Employee
        </Button>
      </div>
    </header>
  );
}
