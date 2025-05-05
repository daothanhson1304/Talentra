import { Book, Calendar, Link, SquareCheckBig } from 'lucide-react';

export function MainSidebar() {
  return (
    <aside className='w-16 bg-layer1 text-primary flex flex-col items-center py-4 gap-4 border-r-[1px] border-secondary'>
      <div className='mt-8 flex flex-col gap-4'>
        <SidebarIcon icon={<SquareCheckBig size={20} />} />
        <SidebarIcon icon={<Link size={20} />} />
        <SidebarIcon icon={<Book size={20} />} />
      </div>
      <div className='mt-auto mb-4 text-primary flex flex-col gap-4 items-center'>
        <UserAvatar initials='DA' />
        <SidebarIcon icon={<Calendar size={20} />} />
      </div>
    </aside>
  );
}

function SidebarIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className='text-xl cursor-pointer p-2 hover:bg-layer3 hover:text-primary rounded-md '>
      {icon}
    </div>
  );
}

function UserAvatar({ initials }: { initials: string }) {
  return (
    <div className='w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center'>
      {initials}
    </div>
  );
}
