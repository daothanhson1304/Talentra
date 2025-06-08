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

export function CreateTaskDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Plus className='bg-layer2 rounded-sm cursor-pointer p-1' />
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px] bg-layer2'>
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='name-1'>Name</Label>
              <Input id='name-1' name='name' defaultValue='Pedro Duarte' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='username-1'>Username</Label>
              <Input id='username-1' name='username' defaultValue='@peduarte' />
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
    </Dialog>
  );
}
