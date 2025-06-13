import { Button } from '@ttrak/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ttrak/ui/components/dialog';
import { Input } from '@ttrak/ui/components/input';
import { Label } from '@ttrak/ui/components/label';
import { Plus } from 'lucide-react';
import { Form } from '@ttrak/ui/components/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
  day: z.string().min(1, {
    message: 'Day must be at least 1 character.',
  }),
  priority: z.enum(['low', 'medium', 'high']),
});

export function CreateTaskDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // username: '',
    },
  });
  return (
    <Dialog>
      <Form {...form}>
        <form>
          <DialogTrigger asChild>
            <Plus className='bg-layer2 rounded-sm cursor-pointer p-1' />
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px] bg-layer2'>
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
              <DialogDescription>
                Create a new task to help you manage your time effectively.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4'>
              <div className='grid gap-3'>
                <Label htmlFor='name-1'>Name</Label>
                <Input id='name-1' name='name' defaultValue='Pedro Duarte' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='username-1'>Username</Label>
                <Input
                  id='username-1'
                  name='username'
                  defaultValue='@peduarte'
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
