import { ChevronLeft, ChevronRight, Circle, Search, Bell } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@talentra/ui/components/tooltip';
import { setCurrentWeekOffset } from '../../stores/slice/calendar-slice';
import { useDispatch } from 'react-redux';
import useCalendar from '../../hooks/use-calendar';
import RefreshIcon from './refresh-icon';

export default function ActionToolbar() {
  const dispatch = useDispatch();
  const { currentWeekOffset, currentWeek } = useCalendar();
  const actions = [
    {
      icon: (
        <ChevronLeft
          size={24}
          className='cursor-pointer text-primary-foreground'
        />
      ),
      label: `Week ${currentWeek - 1 + currentWeekOffset}`,
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
      label: `Week ${currentWeek + 1 + currentWeekOffset}`,
      onClick: () => {
        dispatch(setCurrentWeekOffset(currentWeekOffset + 1));
      },
    },
    {
      icon: <RefreshIcon key='refresh-icon' />,
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
    <div className='flex items-center gap-6 pr-8 pt-2'>
      {actions.map(action => {
        if (action.label) {
          return (
            <Tooltip key={action.label}>
              <TooltipTrigger asChild>
                <button onClick={action.onClick}>{action.icon}</button>
              </TooltipTrigger>
              <TooltipContent>{action.label}</TooltipContent>
            </Tooltip>
          );
        }
        return action.icon;
      })}
    </div>
  );
}
