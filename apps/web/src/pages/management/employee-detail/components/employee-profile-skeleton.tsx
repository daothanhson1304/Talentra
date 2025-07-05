import { Card, CardContent } from '@talentra/ui/components/card';

export default function EmployeeProfileSkeleton() {
  return (
    <Card className='flex-1 max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg bg-layer2 pt-0 h-full'>
      {/* Gradient Header */}
      <div className='relative h-16 bg-gradient-to-r from-[#625efc] to-[#8b8afc]' />

      {/* Avatar + Name */}
      <div className='flex flex-col items-center -mt-18 relative animate-pulse'>
        <div className='w-24 h-24 rounded-full border-4 border-white shadow-md bg-muted' />
        <div className='text-center mt-2 space-y-1'>
          <div className='h-4 w-32 bg-muted rounded mx-auto' />
          <div className='h-3 w-20 bg-muted rounded mx-auto' />
        </div>
      </div>

      {/* Content */}
      <CardContent className='mt-6 space-y-6 px-6 pb-6 animate-pulse'>
        {/* Basic Info */}
        <div>
          <div className='h-4 w-32 bg-muted rounded mb-4' />
          <ul className='space-y-3 text-sm'>
            {Array.from({ length: 6 }).map((_, idx) => (
              <li key={idx} className='flex justify-between items-center h-4'>
                <div className='w-28 h-3 bg-muted rounded' />
                <div className='w-24 h-3 bg-muted rounded' />
              </li>
            ))}
          </ul>
        </div>

        {/* Documents */}
        <div>
          <div className='h-4 w-24 bg-muted rounded mb-4' />
          <div className='flex gap-4'>
            <div className='flex-1 h-10 bg-muted rounded' />
            <div className='flex-1 h-10 bg-muted rounded' />
          </div>
        </div>

        {/* Statistics */}
        <div>
          <div className='h-4 w-24 bg-muted rounded mb-4' />
          <div className='space-y-3'>
            {[1, 2].map(i => (
              <div key={i} className='space-y-2'>
                <div className='flex justify-between'>
                  <div className='w-24 h-3 bg-muted rounded' />
                  <div className='w-12 h-3 bg-muted rounded' />
                </div>
                <div className='w-full h-2 bg-muted rounded' />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
