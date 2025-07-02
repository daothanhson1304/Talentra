'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@talentra/ui/components/select';

interface EmployeeHeaderProps {
  selectedMonth: string;
  onChangeMonth: (month: string) => void;
}

export function EmployeeHeader({
  selectedMonth,
  onChangeMonth,
}: Readonly<EmployeeHeaderProps>) {
  const monthMap: Record<string, string> = {
    '2025-07': 'July 2025',
    '2025-06': 'June 2025',
    '2025-05': 'May 2025',
    '2025-04': 'April 2025',
    '2025-03': 'March 2025',
    '2025-02': 'February 2025',
    '2025-01': 'January 2025',
  };

  const selectedMonthLabel = monthMap[selectedMonth] || 'Unknown';

  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4'>
      <div>
        <h1 className='text-2xl font-semibold'>Employee Overview</h1>
        <p className='text-sm text-muted-foreground'>
          Overview of activities for{' '}
          <span className='font-medium'>{selectedMonthLabel}</span>
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
            <p className='font-medium text-foreground'>Team</p>
            <p>Design</p>
          </div>
          <div>
            <p className='font-medium text-foreground'>Joined</p>
            <p>May 2019</p>
          </div>
          <div>
            <p className='font-medium text-foreground'>Manager</p>
            <p>Thomas Muller</p>
          </div>
        </div>
      </div>
    </div>
  );
}
