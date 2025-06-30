import { ROUTES } from '@/constants';
import { CalendarCheck2, Link as LinkIcon, UsersRound } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { cn } from '@talentra/ui/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@talentra/ui/components/tooltip';

const sidebarItems = [
  {
    icon: <CalendarCheck2 size={20} />,
    path: ROUTES.ROOT,
    label: 'Calendar',
  },
  {
    icon: <UsersRound size={20} />,
    path: ROUTES.EMPLOYEE_MANAGEMENT,
    label: 'Employee Management',
  },
  {
    icon: <LinkIcon size={20} />,
    path: ROUTES.LINK,
    label: 'Link',
  },
];

export default function AppSidebar() {
  const pathname = useLocation().pathname;
  return (
    <aside className='w-16 bg-layer1 flex flex-col items-center py-4 gap-4 border-r-[1px] border-charcoal-gray'>
      <div className='mt-8 flex flex-col gap-4'>
        {sidebarItems.map(item => (
          <Link to={item.path} key={item.path}>
            <SidebarIcon
              className={cn(item.path === pathname && 'bg-layer3')}
              icon={item.icon}
              label={item.label}
            />
          </Link>
        ))}
      </div>
      <div className='mt-auto mb-4 flex flex-col gap-4 items-center'>
        <UserAvatar initials='DA' />
      </div>
    </aside>
  );
}

function SidebarIcon({
  icon,
  className,
  label,
}: {
  icon: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger>
        <div
          className={cn(
            'text-xl cursor-pointer p-2 hover:bg-layer3 rounded-md ',
            className
          )}
        >
          {icon}
        </div>
      </TooltipTrigger>
      <TooltipContent side='right' align='center'>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function UserAvatar({ initials }: { initials: string }) {
  return (
    <div className='w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center'>
      {initials}
    </div>
  );
}
