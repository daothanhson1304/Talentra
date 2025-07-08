import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import useTaskStore from '@/modules/task/hooks/use-task-store';
import useCalendar from '@/modules/calendar/hooks/use-calendar';
import { isDragOverSelector } from '../stores/selector';
import { setIsDragOver } from '../stores/slice';
import {
  ACTION_TOOLBAR_HEIGHT,
  PADDING_PANEL,
  TIME_LINE_WIDTH,
} from '@/constants';
import dayjs from 'dayjs';

const useDragDrop = () => {
  const dispatch = useDispatch();
  const {
    createDraggingTask,
    clearDraggingTask,
    updateScheduledTask,
    draggingTask,
  } = useTaskStore();
  const { pixelsPerMinute, widthPerDay, daysOfWeek } = useCalendar();

  const isDragOver = useSelector(isDragOverSelector);

  const handleDragStart = (event: DragStartEvent) => {
    createDraggingTask(event.active.id as string);
  };
  const handleDragOver = (event: DragOverEvent) => {
    const isOver = !!event.over;
    dispatch(setIsDragOver(isOver));
  };
  const handleDragEnd = (event: DragEndEvent) => {
    clearDraggingTask();
    if (!isDragOver) return;

    const { delta, active } = event;
    const { scheduled, day, distanceFromTop, itemWidth } =
      active.data.current || {};

    const calculateNextDay = (baseDay: string, dayOffset: number) => {
      return dayjs(baseDay).add(dayOffset, 'day').toISOString();
    };

    const calculateDayOffset = (x: number) => {
      const remainder = Math.abs(x) % widthPerDay;

      if (x > 0) {
        if (remainder < widthPerDay / 2) {
          return Math.floor(x / widthPerDay);
        }
        return Math.ceil(x / widthPerDay);
      } else {
        if (remainder < widthPerDay / 2) {
          return Math.ceil(x / widthPerDay);
        }
        return Math.floor(x / widthPerDay);
      }
    };

    const calculateStartSlot = (y: number) => {
      return Math.floor(y / pixelsPerMinute);
    };

    if (!scheduled) {
      const adjustedY = delta.y + distanceFromTop - ACTION_TOOLBAR_HEIGHT;
      const startSlot = calculateStartSlot(adjustedY);
      const daySlot = calculateDayOffset(
        delta.x - itemWidth - PADDING_PANEL * 3 - TIME_LINE_WIDTH
      );
      const nextDay = calculateNextDay(
        daysOfWeek[0] ?? '',
        daySlot < 0 ? 0 : daySlot
      );
      console.log(nextDay, startSlot);
      updateScheduledTask(active.id as string, nextDay, startSlot);
    } else {
      const nextSlot = calculateStartSlot(delta.y);
      const nextDay = calculateNextDay(day, calculateDayOffset(delta.x));
      updateScheduledTask(active.id as string, nextDay, nextSlot);
    }

    dispatch(setIsDragOver(false));
  };

  const isDraggingUnscheduledTask = isDragOver && !draggingTask?.scheduled;

  return {
    isDragOver,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    isDraggingUnscheduledTask,
  };
};

export default useDragDrop;
