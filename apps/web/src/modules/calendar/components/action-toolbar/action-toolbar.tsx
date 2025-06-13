import {
  ChevronLeft,
  ChevronRight,
  Circle,
  RefreshCw,
  Search,
  Bell,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ttrak/ui/components/tooltip';
import { setCurrentWeekOffset } from '../../stores/slice/calendar-slice';
import { useDispatch, useSelector } from 'react-redux';
import { currentWeekOffsetSelector } from '../../stores/selector/calendar-selector';

export default function ActionToolbar() {
  const dispatch = useDispatch();
  const currentWeekOffset = useSelector(currentWeekOffsetSelector);
  const actions = [
    {
      icon: (
        <ChevronLeft
          size={24}
          className='cursor-pointer text-primary-foreground'
        />
      ),
      label: 'Previous week',
      onClick: () => {
        dispatch(setCurrentWeekOffset(currentWeekOffset - 1));
      },
    },
    {
      icon: (
        <Circle size={16} className='cursor-pointer text-primary-foreground' />
      ),
      label: 'Current week',
      onClick: () => {
        dispatch(setCurrentWeekOffset(0));
      },
    },
    {
      icon: (
        <ChevronRight
          size={24}
          className='cursor-pointer text-primary-foreground'
        />
      ),
      label: 'Next week',
      onClick: () => {
        dispatch(setCurrentWeekOffset(currentWeekOffset + 1));
      },
    },
    {
      icon: (
        <RefreshCw
          size={16}
          className='cursor-pointer text-primary-foreground'
        />
      ),
      label: 'Refresh',
    },

    {
      icon: (
        <Search size={20} className='cursor-pointer text-primary-foreground' />
      ),
      label: 'Search',
    },
    {
      icon: (
        <Bell size={20} className='cursor-pointer text-primary-foreground' />
      ),
      label: 'Notifications',
    },
  ];
  return (
    <div className='flex items-center gap-6 pt-1 pr-8 pt-2'>
      {actions.map(action => (
        <Tooltip key={action.label}>
          <TooltipTrigger asChild>
            <button onClick={action.onClick}>{action.icon}</button>
          </TooltipTrigger>
          <TooltipContent>{action.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
