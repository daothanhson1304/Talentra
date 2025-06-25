import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ttrak/ui/components/button';
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
import { Plus, User, Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EmployeeRole } from '@ttrak/types/employee';
import { toast } from '@ttrak/ui/components/sonner';
import dayjs from 'dayjs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ttrak/ui/components/tooltip';
import { useCreateEmployeeMutation } from '../stores/api/employee.api';
import LoadingButton from '@ttrak/ui/components/loading-button';
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
  role: z.nativeEnum(EmployeeRole).default(EmployeeRole.Teacher),
});

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  role: EmployeeRole.Teacher,
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
        salary: 12000,
        department: 'IT',
        position: 'Developer',
        avatar: `https://robohash.org/${Math.random().toString(36).substring(2)}.png`,
        role: values.role,
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
                <User size={16} />
                <span className='text-muted-foreground'>Role</span>
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='bg-transparent border-none outline-none p-0'>
                        <SelectValue placeholder='Select role' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='teacher'>Teacher</SelectItem>
                          <SelectItem value='admin'>Admin</SelectItem>
                          <SelectItem value='manager'>Manager</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
