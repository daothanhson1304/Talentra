import useTaskStore from '@/modules/task/hooks/use-task-store';
import { DragOverEvent } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { setOverId } from '../../app/drag-drop/stores/slice/drag-slice.js';
import { Task } from '@ttrak/types/task';
import { currentWeekOffsetSelector } from '@/modules/calendar/stores/selector/calendar-selector.js';
import { getDayOfWeek } from '@/modules/calendar/helpers/date.js';

export default function useDragDropTask() {
  const dispatch = useDispatch();
  const { draftTask, updateDraftTask } = useTaskStore();
  const currentWeekOffset = useSelector(currentWeekOffsetSelector);
  const dragOverHandler = (e: DragOverEvent) => {
    dispatch(setOverId(e.over?.id as string));
    const activeTask = e.active?.data.current as Task;
    const overTask = e.over?.data.current;
    const draftTask = overTask
      ? {
          ...activeTask,
          day: getDayOfWeek(currentWeekOffset, overTask.dayOffset as number),
          startSlot: overTask.startSlot,
        }
      : null;
    updateDraftTask(draftTask);
  };
  const clearDraftState = () => {
    updateDraftTask(null);
    dispatch(setOverId(null));
  };

  return {
    dragOverHandler,
    clearDraftState,
    draftTask,
  };
}
