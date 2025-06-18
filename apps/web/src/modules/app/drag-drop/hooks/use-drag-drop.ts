import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
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

export default function useDragDrop() {
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
  const handleDragOver = () => {
    dispatch(setIsDragOver(true));
  };
  const handleDragEnd = (event: DragEndEvent) => {
    if (!isDragOver) return;

    const { delta, active } = event;
    const { scheduled, day, distanceFromTop, itemWidth } =
      active.data.current || {};

    const calculateNextDay = (baseDay: string, dayOffset: number) => {
      return dayjs(baseDay).add(dayOffset, 'day').toISOString();
    };

    const calculateDayOffset = (x: number) => {
      return Math.floor(x / widthPerDay);
    };

    const calculateStartSlot = (y: number) => {
      return Math.floor(y / pixelsPerMinute);
    };

    if (!scheduled) {
      const startSlot = calculateStartSlot(
        delta.y + distanceFromTop - ACTION_TOOLBAR_HEIGHT
      );

      const daySlot = calculateDayOffset(
        delta.x - itemWidth - PADDING_PANEL * 3 - TIME_LINE_WIDTH
      );

      const nextDay = calculateNextDay(daysOfWeek[0] ?? '', daySlot);
      updateScheduledTask(active.id as string, nextDay, startSlot);
    } else {
      clearDraggingTask();
      const nextSlot = calculateStartSlot(delta.y);
      if (nextSlot === 0) return;
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
}
