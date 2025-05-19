'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ttrak/ui/components/popover';
import { Input } from '@ttrak/ui/components/input';
import { Textarea } from '@ttrak/ui/components/textarea';
import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { DEFAULT_TASK_NAME } from '../constants';

export default function CreateTaskPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [taskName, setTaskName] = useState(DEFAULT_TASK_NAME);

  const handleSave = () => {
    // Xử lý lưu task
    console.log('Saving task:', taskName);
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      setTaskName(DEFAULT_TASK_NAME);
    }
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Plus className='bg-layer2 rounded-sm cursor-pointer p-1' />
      </PopoverTrigger>
      <PopoverContent className='w-[380px] border-none space-y-4 bg-layer3 text-white rounded-xl p-0'>
        <div className='bg-layer2 text-white rounded-xl p-4  border border-charcoal-gray'>
          {/* Header */}
          <div className='flex justify-between items-center mb-4 border-b border-zinc-700 pb-2'>
            <Input
              className='text-lg font-semibold border-charcoal-gray'
              value={taskName}
              onChange={e => {
                setTaskName(e.target.value);
              }}
            />
          </div>

          {/* Notes Input */}
          <Textarea
            className='w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none resize-none mb-3 border-charcoal-gray'
            placeholder='Notes'
            rows={2}
          />

          {/* Task list */}
          <div className='flex items-center text-sm text-zinc-300 mb-3'>
            <span className='mr-2'>📘</span>
            <span className='text-white'>Task list</span>
            <span className='ml-1 text-zinc-400'>Inbox</span>
          </div>

          {/* Importance */}
          <div className='flex items-center text-sm text-zinc-300 mb-3'>
            <span className='mr-2'>👤</span>
            <span className='text-white'>Importance</span>
            <span className='ml-1 text-zinc-400'>Normal</span>
          </div>

          {/* Estimate */}
          <div className='flex items-center text-sm text-zinc-300 mb-3'>
            <span className='mr-2'>⏱️</span>
            <span className='text-white'>Estimate</span>
            <input
              type='text'
              className='ml-2 bg-transparent border-none outline-none placeholder-zinc-500 w-full'
              placeholder='Type your estimation, e.g. 60m'
            />
          </div>

          {/* Due Date */}
          <div className='flex items-center text-sm text-zinc-300 mb-4'>
            <span className='mr-2'>🗓️</span>
            <span className='text-white'>Due date</span>
            <input
              type='date'
              className='ml-2 bg-transparent border-none outline-none text-white'
            />
          </div>

          {/* Buttons */}
          <div className='flex justify-between items-center justify-end '>
            <div className='flex gap-5'>
              <button
                className='text-sm text-zinc-300 cursor-pointer'
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className='bg-primary text-white px-4 py-1 rounded-md text-sm hover:bg-primary-active cursor-pointer'
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
