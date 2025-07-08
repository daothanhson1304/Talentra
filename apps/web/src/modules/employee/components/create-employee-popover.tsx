import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@talentra/ui/components/button';
import { Form, FormField } from '@talentra/ui/components/form';
import { Input } from '@talentra/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@talentra/ui/components/popover';

import { Plus, Mail, Phone, MapPin, UserPen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@talentra/ui/components/sonner';
import dayjs from 'dayjs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@talentra/ui/components/tooltip';
import { useCreateEmployeeMutation } from '../stores/api/employee.api';
import LoadingButton from '@talentra/ui/components/loading-button';
import { FULL_DATE_TIME_FORMAT } from '@/constants/format-date';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Employee name is required',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  phone: z.string().min(1, {
    message: 'Phone number is required',
  }),
  address: z.string().optional(),
  position: z.string().optional(),
});

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  position: '',
};

export default function CreateEmployeePopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createEmployee({
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address ?? '',
        position: values.position ?? '',
        salary: 0,
        department: '',
        avatar: '',
        dateOfBirth: '',
        country: '',
        city: '',
      }).unwrap();

      toast('Employee has been created', {
        description: dayjs(new Date()).format(FULL_DATE_TIME_FORMAT),
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
      handleOpenChange(false);
    } catch (error: any) {
      console.error('Failed to create employee:', error);
      toast.error('Failed to create employee', {
        description: error?.data?.error ?? 'Something went wrong',
      });
    }
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
        <TooltipContent>New Employee</TooltipContent>
      </Tooltip>
      <PopoverContent className='w-[380px] border-none space-y-4 bg-layer3 text-white rounded-xl p-0'>
        <div className='bg-layer2 text-white rounded-xl p-4  border border-charcoal-gray'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex justify-between items-center mb-4 border-b border-zinc-700 pb-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <Input
                      className='text-lg font-semibold border-charcoal-gray'
                      placeholder='Name'
                      {...field}
                    />
                  )}
                />
              </div>

              <div className='flex items-center text-sm text-zinc-300 mb-3 gap-2'>
                <Mail size={16} />
                <span className='text-muted-foreground'>Email</span>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <Input
                      type='email'
                      className='bg-transparent border-none outline-none placeholder-zinc-500 w-full'
                      placeholder='Enter email address'
                      {...field}
                    />
                  )}
                />
              </div>

              <div className='flex items-center text-sm text-zinc-300 mb-3 gap-2'>
                <Phone size={16} />
                <span className='text-muted-foreground'>Phone</span>
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <Input
                      type='tel'
                      className='bg-transparent border-none outline-none placeholder-zinc-500 w-full'
                      placeholder='Enter phone number'
                      {...field}
                    />
                  )}
                />
              </div>

              <div className='flex items-center text-sm text-zinc-300 mb-3 gap-2'>
                <MapPin size={16} />
                <span className='text-muted-foreground'>Address</span>
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <Input
                      className='bg-transparent border-none outline-none placeholder-zinc-500 w-full'
                      placeholder='Enter address (optional)'
                      {...field}
                    />
                  )}
                />
              </div>

              <div className='flex items-center text-sm text-zinc-300 mb-4 gap-2'>
                <UserPen size={16} />
                <span className='text-muted-foreground'>Position</span>
                <FormField
                  control={form.control}
                  name='position'
                  render={({ field }) => (
                    <Input
                      className='bg-transparent border-none outline-none placeholder-zinc-500 w-full'
                      placeholder='Enter position (optional)'
                      {...field}
                    />
                  )}
                />
              </div>

              <div className='flex items-center justify-end'>
                <div className='flex gap-5'>
                  <Button
                    variant='outline'
                    className='text-sm text-zinc-300 cursor-pointer'
                    onClick={() => handleOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    isLoading={isLoading}
                    className='bg-primary text-white px-4 py-1 rounded-md text-sm hover:bg-primary-active cursor-pointer w-fit relative'
                    variant='default'
                    type='submit'
                  >
                    Save
                  </LoadingButton>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
