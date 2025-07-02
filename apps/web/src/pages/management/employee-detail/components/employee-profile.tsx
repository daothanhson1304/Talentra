import { Mail, Phone, MapPin, Cake, Globe, Home } from 'lucide-react';
import { Card, CardContent } from '@talentra/ui/components/card';
import { Button } from '@talentra/ui/components/button';
import { memo } from 'react';
import dayjs from 'dayjs';
import { Employee } from '@talentra/types/employee';

const EmployeeProfile = ({
  employeeProfile,
}: Readonly<{ employeeProfile: Employee }>) => {
  return (
    <Card className='max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg bg-layer2 pt-0'>
      <div className='relative h-16 bg-gradient-to-r from-[#625efc] to-[#8b8afc]' />
      <div className='flex flex-col items-center -mt-18 relative'>
        <img
          className='w-24 h-24 rounded-full border-4 border-white shadow-md object-cover'
          src='https://randomuser.me/api/portraits/women/65.jpg'
          alt='Avatar'
        />
        <div className='text-center mt-2'>
          <h2 className='text-lg font-semibold'>{employeeProfile?.name}</h2>
          <p className='text-sm text-muted-foreground'>
            {employeeProfile?.position}
          </p>
        </div>
      </div>

      <CardContent className='mt-6 space-y-4 px-6 pb-6'>
        <div>
          <h3 className='text-sm font-medium mb-2'>Basic Information</h3>
          <ul className='space-y-2 text-sm text-muted-foreground'>
            <li className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <Cake size={16} /> Birthday
              </div>
              <span className='text-right text-foreground'>
                {dayjs(employeeProfile?.dateOfBirth).format('DD MMM YYYY')}
              </span>
            </li>
            <li className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <Phone size={16} /> Phone number
              </div>
              <span className='text-right text-foreground'>
                {employeeProfile?.phone}
              </span>
            </li>
            <li className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <Mail size={16} /> E-Mail
              </div>
              <span className='text-right text-foreground'>
                {employeeProfile?.email}
              </span>
            </li>
            <li className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <Globe size={16} /> Citizenship
              </div>
              <span className='text-right text-foreground'>
                {employeeProfile?.country}
              </span>
            </li>
            <li className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <MapPin size={16} /> City
              </div>
              <span className='text-right text-foreground'>
                {employeeProfile?.city}
              </span>
            </li>
            <li className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <Home size={16} /> Address
              </div>
              <span className='text-right text-foreground text-sm'>
                {employeeProfile?.address}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-sm font-medium mb-2'>Documents</h3>
          <div className='flex gap-4'>
            <Button variant='secondary' className='flex-1 justify-start gap-2'>
              <img src='/icons/word.png' alt='Word' className='w-5 h-5' />
              Contract{' '}
              <span className='ml-auto text-xs text-muted-foreground'>
                23 mb
              </span>
            </Button>
            <Button
              variant='secondary'
              className='flex-1 justify-start gap-2 bg-red-100 text-red-600'
            >
              <img src='/icons/ppt.png' alt='PPT' className='w-5 h-5' />
              Resume{' '}
              <span className='ml-auto text-xs text-muted-foreground'>
                76 mb
              </span>
            </Button>
          </div>
        </div>

        <div>
          <h3 className='text-sm font-medium mb-2'>Statistics</h3>
          <div className='space-y-2'>
            <div>
              <div className='flex justify-between text-sm'>
                <span>Business trips</span>
                <span>58 days</span>
              </div>
              {/* <Progress value={80} className='h-2 mt-1' /> */}
            </div>
            <div>
              <div className='flex justify-between text-sm'>
                <span>Sickness</span>
                <span>24 days</span>
              </div>
              {/* <Progress value={30} className='h-2 mt-1 bg-muted' /> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(EmployeeProfile);
