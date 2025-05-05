'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ttrak/ui/components/popover';
import { Button } from '@ttrak/ui/components/button';
import { Input } from '@ttrak/ui/components/input';
import { Textarea } from '@ttrak/ui/components/textarea';
import { useState } from 'react';
import {
  CalendarIcon,
  Handshake,
  MapPinned,
  Plus,
  School,
  SquareUser,
  TrashIcon,
} from 'lucide-react';

export default function CreateTaskPopover() {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState('');

  const handleSave = () => {
    // Xử lý lưu task
    console.log('Saving task:', taskName);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Plus className='bg-layer2 rounded-sm text-primary cursor-pointer p-1' />
      </PopoverTrigger>
      <PopoverContent className='w-[380px] p-4 border-none space-y-4 bg-layer3 text-white shadow-2xl rounded-xl'>
        <div className='space-y-2'>
          <Input
            placeholder='New Task'
            className='text-lg font-semibold text-white bg-neutral-800 border-none focus-visible:ring-0 focus-visible:ring-offset-0'
          />
          <Textarea
            placeholder='Notes'
            className='bg-neutral-800 border-none text-sm text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0'
          />
        </div>

        <div className='space-y-2 text-sm text-gray-300'>
          <div className='flex justify-between items-center'>
            <span className='flex items-center gap-2'>
              <School size={16} />
              School
              <span className='text-white font-medium'>Phùng Chí Kiên</span>
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='flex items-center gap-2'>
              <MapPinned size={16} />
              Classroom
              <span className='text-white font-medium'>3A</span>
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='flex items-center gap-2'>
              <SquareUser size={16} />
              Teacher
              <span className='text-white font-medium'>Mrs. Alice</span>
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='flex items-center gap-2'>
              <Handshake size={16} />
              Assistant
              <span className='text-white font-medium'>Nguyễn Văn A</span>
            </span>
          </div>
        </div>

        <div className='flex justify-between items-center pt-4'>
          <Button variant='ghost' className='text-red-500 hover:bg-red-500/10'>
            <TrashIcon className='mr-2 h-4 w-4' /> Delete
          </Button>
          <div className='space-x-2'>
            <Button variant='ghost' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant='default'>Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
