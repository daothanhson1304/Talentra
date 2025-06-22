import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ttrak/ui/components/button';
import { Calendar } from '@ttrak/ui/components/calendar';
import { Form, FormField } from '@ttrak/ui/components/form';
import { Input } from '@ttrak/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ttrak/ui/components/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ttrak/ui/components/select';
import { Textarea } from '@ttrak/ui/components/textarea';
import { Calendar as CalendarIcon, Clock, Flag, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useTaskStore from '../hooks/use-task-store';
import { Importance } from '@ttrak/types/task';
import { toast } from '@ttrak/ui/components/sonner';
import dayjs from 'dayjs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ttrak/ui/components/tooltip';

const formSchema = z.object({
  taskName: z.string().min(1, {
    message: 'Task name is required',
  }),
  notes: z.string().optional(),
  importance: z.nativeEnum(Importance).optional(),
  estimate: z.string().optional(),
  dueDate: z.date().optional(),
});

const defaultValues = {
  taskName: 'New Task',
  notes: '',
  importance: Importance.medium,
  estimate: '',
  dueDate: new Date(),
};

export default function CreateTaskPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { createTask, tasks } = useTaskStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createTask({
      id: (tasks.length + 1).toString(),
      title: values.taskName,
      description: values.notes ?? '',
      importance: values.importance ?? Importance.medium,
      day: new Date().toISOString(),
      startSlot: 0,
      slotCount: 6,
      scheduled: false,
    });
    toast('Task has been created', {
      description: dayjs(new Date()).format('dddd, MMMM DD, YYYY [at] h:mm A'),
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    });
    handleOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      form.reset(defaultValues);
    }
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Plus className='bg-layer2 rounded-sm cursor-pointer p-1' />
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Create Task</TooltipContent>
      </Tooltip>
      <PopoverContent className='w-[380px] border-none space-y-4 bg-layer3 text-white rounded-xl p-0'>
        <div className='bg-layer2 text-white rounded-xl p-4  border border-charcoal-gray'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex justify-between items-center mb-4 border-b border-zinc-700 pb-2'>
                <FormField
                  control={form.control}
                  name='taskName'
                  render={({ field }) => (
                    <Input
                      className='text-lg font-semibold border-charcoal-gray'
                      placeholder='New Task'
                      {...field}
                    />
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='notes'
                render={({ field }) => (
                  <Textarea
                    className='w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none resize-none mb-3 border-charcoal-gray'
                    placeholder='Notes'
                    {...field}
                  />
                )}
              />

              <div className='flex items-center text-sm text-zinc-300 mb-1 gap-2'>
                <Flag size={12} />
                <span className='text-muted-foreground'>Importance</span>
                <FormField
                  control={form.control}
                  name='importance'
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='bg-transparent border-none outline-none p-0'>
                        <SelectValue placeholder='Select priority' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='high'>High</SelectItem>
                          <SelectItem value='medium'>Medium</SelectItem>
                          <SelectItem value='normal'>Normal</SelectItem>
                          <SelectItem value='low'>Low</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className='flex items-center text-sm text-zinc-300 mb-3 gap-2'>
                <Clock size={16} />
                <span className='text-muted-foreground'>Estimate</span>
                <FormField
                  control={form.control}
                  name='estimate'
                  render={({ field }) => (
                    <Input
                      type='text'
                      className='bg-transparent border-none outline-none placeholder-zinc-500 w-full'
                      placeholder='Type your estimation, e.g. 60m'
                      {...field}
                    />
                  )}
                />
              </div>

              <div className='flex items-center text-sm text-zinc-300 mb-4 gap-2'>
                <CalendarIcon size={14} />
                <span className='text-muted-foreground'>Due date</span>
                <Popover>
                  <PopoverTrigger>
                    <FormField
                      control={form.control}
                      name='dueDate'
                      render={({ field }) => (
                        <p className='cursor-pointer'>
                          {field.value?.toLocaleDateString()}
                        </p>
                      )}
                    />
                  </PopoverTrigger>
                  <PopoverContent className='p-0 w-fit bg-layer3 shadow-lg'>
                    <Calendar
                      mode='single'
                      selected={form.getValues('dueDate')}
                      onSelect={date => form.setValue('dueDate', date)}
                      className='rounded-md border shadow-sm'
                      captionLayout='dropdown'
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className='flex justify-between items-center justify-end '>
                <div className='flex gap-5'>
                  <Button
                    variant='outline'
                    className='text-sm text-zinc-300 cursor-pointer'
                    onClick={() => handleOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className='bg-primary text-white px-4 py-1 rounded-md text-sm hover:bg-primary-active cursor-pointer'
                    variant='default'
                    type='submit'
                  >
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
