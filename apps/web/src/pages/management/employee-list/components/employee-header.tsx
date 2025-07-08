import { CalendarDays, Smile, Users } from 'lucide-react';
import dayjs from 'dayjs';
import { Card, CardContent } from '@talentra/ui/components/card';
import { useEffect, useState } from 'react';

export default function EmployeeHeader() {
  return (
    <div className='bg-layer2 rounded-xl p-6 space-y-4'>
      {/* Date + Greeting */}
      <div className='flex flex-col gap-1'>
        <Greeting />
        <h2 className='text-2xl font-bold '>
          Hello, Lan Anh! <span className='inline-block animate-wave'>👋</span>
        </h2>
        <p className='text-sm'>Track & manage your team progress here</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <Card className='rounded-lg bg-layer1'>
          <CardContent className='flex items-center gap-4 p-4'>
            <div className='bg-orange-100 p-2 rounded-full'>
              <Users className='text-orange-600' size={20} />
            </div>
            <div>
              <p className='text-xl font-semibold '>1,242</p>
              <p className='text-sm text-muted-foreground'>Total Employees</p>
            </div>
          </CardContent>
        </Card>

        <Card className='rounded-lg bg-layer1'>
          <CardContent className='flex items-center gap-4 p-4'>
            <div className='bg-orange-100 p-2 rounded-full'>
              <CalendarDays className='text-orange-600' size={20} />
            </div>
            <div>
              <p className='text-xl font-semibold '>32%</p>
              <p className='text-sm text-muted-foreground'>Turnover Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card className='rounded-lg bg-layer1'>
          <CardContent className='flex items-center gap-4 p-4'>
            <div className='bg-orange-100 p-2 rounded-full'>
              <Smile className='text-orange-600' size={20} />
            </div>
            <div>
              <p className='text-xl font-semibold '>78%</p>
              <p className='text-sm text-muted-foreground'>Happiness Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const Greeting = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = dayjs().hour();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return <p className='text-sm'>{greeting}</p>;
};
