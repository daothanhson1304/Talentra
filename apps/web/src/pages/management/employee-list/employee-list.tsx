import { EmployeeTable } from './components/employee-table';
import EmployeeHeader from './components/employee-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@talentra/ui/components/card';
import { Input } from '@talentra/ui/components/input';

import { SalaryChart } from './components/salary-chart';

export default function EmployeeList() {
  return (
    <div className='bg-layer1 w-full p-4 space-y-6 overflow-y-auto'>
      <EmployeeHeader />

      <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6'>
        <Card className='bg-layer2'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle>Employee List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col sm:flex-row gap-2 mb-4'>
              <Input
                placeholder='Search by name or email...'
                className='w-full sm:w-64'
              />
            </div>
            <EmployeeTable />
          </CardContent>
        </Card>

        <SalaryChart />
      </div>
    </div>
  );
}
