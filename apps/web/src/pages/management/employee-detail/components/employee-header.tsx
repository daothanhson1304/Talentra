'use client';

import { MONTH_YEAR_FORMAT } from '@/constants/format-date';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@talentra/ui/components/select';
import dayjs from 'dayjs';

interface EmployeeHeaderProps {
  selectedMonth: string;
  onChangeMonth: (month: string) => void;
  salary: number;
  joinedDate: string;
  department: string;
}

export function EmployeeHeader({
  selectedMonth,
  onChangeMonth,
  salary,
  joinedDate,
  department,
}: Readonly<EmployeeHeaderProps>) {
  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4'>
      <div>
        <h1 className='text-2xl font-semibold'>Employee Overview</h1>
        <p className='text-sm text-muted-foreground'>
          Overview of activities for{' '}
          <span className='font-medium'>
            {dayjs(selectedMonth).format(MONTH_YEAR_FORMAT)}
          </span>
        </p>
      </div>

      <div className='flex flex-col md:flex-row items-start md:items-center gap-6 mt-2 md:mt-0'>
        {/* Select Month */}
        <Select onValueChange={onChangeMonth} defaultValue={selectedMonth}>
          <SelectTrigger className='min-w-[180px] px-4 py-2 h-auto text-base rounded-md'>
            <SelectValue placeholder='Select month' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='2025-07'>July 2025</SelectItem>
            <SelectItem value='2025-06'>June 2025</SelectItem>
            <SelectItem value='2025-05'>May 2025</SelectItem>
            <SelectItem value='2025-04'>April 2025</SelectItem>
            <SelectItem value='2025-03'>March 2025</SelectItem>
            <SelectItem value='2025-02'>February 2025</SelectItem>
            <SelectItem value='2025-01'>January 2025</SelectItem>
          </SelectContent>
        </Select>

        <div className='text-sm flex gap-6 text-muted-foreground'>
          <div>
            <p className='font-medium text-foreground'>Department</p>
            <p>{department}</p>
          </div>
          <div>
            <p className='font-medium text-foreground'>Joined</p>
            <p>{dayjs(joinedDate).format(MONTH_YEAR_FORMAT)}</p>
          </div>
          <div>
            <p className='font-medium text-foreground'>Salary</p>
            <p>{Math.round(salary).toLocaleString()} VND</p>
          </div>
        </div>
      </div>
    </div>
  );
}
