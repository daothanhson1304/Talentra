import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import useTaskStore from '@/modules/task/hooks/use-task-store';
import useCalendar from '@/modules/calendar/hooks/use-calendar';
import { isDragOverSelector } from '../stores/selector';
import { setIsDragOver } from '../stores/slice';
import { useState } from 'react';

export default function useDragDrop() {
  const dispatch = useDispatch();
  const [isDraggingOnCalendar, setIsDraggingOnCalendar] = useState(false);
  const {
    createDraggingTask,
    clearDraggingTask,
    updateScheduledTask,
    draggingTask,
  } = useTaskStore();
  const { pixelsPerMinute, widthPerDay } = useCalendar();
  const isDragOver = useSelector(isDragOverSelector);
  const handleDragStart = (event: DragStartEvent) => {
    createDraggingTask(event.active.id as string);
  };
  const handleDragOver = (event: DragOverEvent) => {
    console.log('drag over', event);
    dispatch(setIsDragOver(true));
  };
  const handleDragEnd = (event: DragEndEvent) => {
    clearDraggingTask();
    dispatch(setIsDragOver(false));
    const { x, y } = event.delta;

    const nextSlot = Math.floor(y / pixelsPerMinute);
    const nextDay = Math.floor(x / widthPerDay);
    if (nextSlot === 0 && nextDay === 0) return;
    updateScheduledTask(event.active.id as string, nextDay, nextSlot);
  };

  const isDraggingUnscheduledTask = isDragOver && !draggingTask?.scheduled;

  return {
    isDragOver,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    isDraggingUnscheduledTask,
    isDraggingOnCalendar,
    setIsDraggingOnCalendar,
  };
}
