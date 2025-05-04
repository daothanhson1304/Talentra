import useTasks from '@/modules/task/hooks/useTasks';
import { Task } from '@/modules/task/stores/slice/task-slice';
import { DragOverEvent } from '@dnd-kit/core';
import { useDispatch } from 'react-redux';
import { setOverId } from '../stores/drag-slice';

export default function useDragOver() {
  const dispatch = useDispatch();
  const { draftTask, updateDraftTask } = useTasks();
  const dragOverHandler = (e: DragOverEvent) => {
    dispatch(setOverId(e.over?.id as string));
    const activeTask = e.active?.data.current as Task;
    const overTask = e.over?.data.current as Task;
    const draftTask = overTask
      ? {
          ...activeTask,
          day: overTask.day,
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
