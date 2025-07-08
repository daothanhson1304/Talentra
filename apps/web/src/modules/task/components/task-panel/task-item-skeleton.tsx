import { cn } from '@talentra/ui/lib/utils';
import { Skeleton } from '@talentra/ui/components/skeleton';

interface TaskItemSkeletonProps {
  className?: string;
}

export default function TaskItemSkeleton({
  className,
}: Readonly<TaskItemSkeletonProps>) {
  return (
    <li
      className={cn(
        'py-2 px-3 rounded-md bg-layer3 transition-all duration-200 list-none',
        {
          'bg-layer2': true,
        },
        className
      )}
    >
      <div
        className={cn('cursor-default flex items-center gap-2', {
          'w-full h-[40px] rounded-md': true,
        })}
      >
        {true && (
          <>
            <Skeleton className='w-5 h-5 rounded-sm' />
            <div className='flex flex-col flex-1 min-w-0 gap-1'>
              <Skeleton className='h-4 w-3/4 rounded-sm' />
              <Skeleton className='h-3 w-1/2 rounded-sm' />
            </div>
          </>
        )}
      </div>
    </li>
  );
}
