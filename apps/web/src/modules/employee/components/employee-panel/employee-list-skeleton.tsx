import { Skeleton } from '@talentra/ui/components/skeleton';

export default function EmployeeListSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      {[...Array(10)].map((_, i) => (
        <div
          className='flex items-start gap-4 rounded-md p-2 hover:bg-layer3'
          key={i}
        >
          <Skeleton className='w-10 h-10 rounded-full border border-border' />

          <div className='flex justify-between flex-1 gap-1'>
            <div className='flex flex-col gap-2'>
              <Skeleton className='w-32 h-4 rounded' />
              <Skeleton className='w-40 h-3 rounded' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-8 h-4 rounded' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
