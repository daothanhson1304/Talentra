'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ttrak/ui/components/popover';
import { Button } from '@ttrak/ui/components/button';
import { Input } from '@ttrak/ui/components/input';
import { Textarea } from '@ttrak/ui/components/textarea';
import { Label } from '@ttrak/ui/components/label';
import { useState } from 'react';
import { Plus } from 'lucide-react';

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
        <Button>
          <Plus />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[350px] p-4 space-y-4 bg-popover text-popover-foreground border border-border rounded-md shadow-md'>
        <div>
          <Label htmlFor='task-name' className='text-sm font-medium'>
            Task name
          </Label>
          <Input
            id='task-name'
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            placeholder='Enter task name'
            className='mt-1'
          />
        </div>

        <div>
          <Label htmlFor='task-notes'>Notes</Label>
          <Textarea id='task-notes' placeholder='Add some notes...' />
        </div>

        <div className='flex justify-end space-x-2'>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
