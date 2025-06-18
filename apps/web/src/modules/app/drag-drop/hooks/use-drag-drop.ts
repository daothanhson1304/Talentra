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
    const { delta, active } = event;
    if (active.data.current?.scheduled === false) {
      const startSlot = Math.floor(
        (delta.y +
          active.data.current?.distanceFromTop -
          ACTION_TOOLBAR_HEIGHT) /
          pixelsPerMinute
      );
      const daySlot = Math.floor(
        (delta.x -
          active.data.current?.itemWidth -
          PADDING_PANEL * 3 -
          TIME_LINE_WIDTH) /
          widthPerDay
      );
      const firstDayOffWeek = daysOfWeek[0];
      const nextDay = dayjs(firstDayOffWeek).add(daySlot, 'day').toISOString();

      updateScheduledTask(active.id as string, nextDay, startSlot);
    } else {
      clearDraggingTask();

      const { x, y } = delta;
      const nextSlot = Math.floor(y / pixelsPerMinute);
      const nextDay = dayjs(active.data.current?.day)
        .add(Math.floor(x / widthPerDay), 'day')
        .toISOString();
      if (nextSlot === 0) return;
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
