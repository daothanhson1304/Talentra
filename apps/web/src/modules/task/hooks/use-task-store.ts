import { useDispatch, useSelector } from 'react-redux';
import {
  draggingTaskIdSelector,
  editedTasksSelector,
  isSavingBulkTaskSelector,
  originalTasksSelector,
  taskBySelectedEmployeeIdSelector,
} from '../stores/selector/task-selector.js';
import {
  updateScheduledTask as updateScheduledTaskAction,
  updateSlotCount,
  setDraggingTaskId,
  syncWithOriginal as syncWithOriginalAction,
  setIsSavingBulkTask as setIsSavingBulkTaskAction,
} from '../stores/slice/task-slice.js';
import { useMemo } from 'react';
import { useGetEmployeeState } from '@/modules/employee/hooks/use-get-employee-state.js';

export default function useTaskStore() {
  const dispatch = useDispatch();
  const draggingTaskId = useSelector(draggingTaskIdSelector);
  const { selectedEmployeeId } = useGetEmployeeState();

  const tasks = useSelector(taskBySelectedEmployeeIdSelector);

  const editedTasks = useSelector(editedTasksSelector);
  const originalTasks = useSelector(originalTasksSelector);
  const isSavingBulkTask = useSelector(isSavingBulkTaskSelector);

  const updateScheduledTask = (
    taskId: string,
    day: string,
    startSlot: number
  ) => {
    if (!selectedEmployeeId) return;
    dispatch(
      updateScheduledTaskAction({
        id: taskId,
        day,
        startSlot,
        employeeId: selectedEmployeeId,
      })
    );
  };
  const getTaskById = (taskId: string) => {
    return tasks?.find(task => task._id === taskId);
  };
  const createDraggingTask = (taskId: string) => {
    dispatch(setDraggingTaskId(taskId));
  };
  const clearDraggingTask = () => {
    dispatch(setDraggingTaskId(null));
  };
  const updateTaskSlotCount = (taskId: string, slotCount: number) => {
    if (!selectedEmployeeId) return;
    dispatch(
      updateSlotCount({
        id: taskId,
        slotCount,
        employeeId: selectedEmployeeId,
      })
    );
  };

  const draggingTask = useMemo(() => {
    if (!draggingTaskId) return null;
    return getTaskById(draggingTaskId);
  }, [draggingTaskId]);

  const syncWithOriginal = () => {
    dispatch(syncWithOriginalAction());
  };

  const setIsSavingBulkTask = (isSaving: boolean) => {
    dispatch(setIsSavingBulkTaskAction(isSaving));
  };

  return {
    tasks,
    editedTasks,
    originalTasks,
    getTaskById,
    syncWithOriginal,
    createDraggingTask,
    clearDraggingTask,
    updateTaskSlotCount,
    updateScheduledTask,
    draggingTaskId,
    isSavingBulkTask,
    setIsSavingBulkTask,
    draggingTask,
  };
}
