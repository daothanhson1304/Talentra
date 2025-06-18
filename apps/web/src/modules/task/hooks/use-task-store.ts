import { useDispatch, useSelector } from 'react-redux';
import {
  draggingTaskIdSelector,
  taskListSelector,
} from '../stores/selector/task-selector.js';
import {
  addTask,
  makeScheduledTask,
  updateScheduledTask as updateScheduledTaskAction,
  updateSlotCount,
  setDraggingTaskId,
} from '../stores/slice/task-slice.js';
import { Task } from '@ttrak/types/task';
import { useMemo } from 'react';

export default function useTaskStore() {
  const dispatch = useDispatch();
  const tasks = useSelector(taskListSelector);
  const draggingTaskId = useSelector(draggingTaskIdSelector);
  const scheduleTask = (taskId: string, day: string, startSlot: number) => {
    dispatch(makeScheduledTask({ id: taskId, day, startSlot }));
  };
  const updateScheduledTask = (
    taskId: string,
    day: string,
    startSlot: number
  ) => {
    dispatch(updateScheduledTaskAction({ id: taskId, day, startSlot }));
  };
  const getTaskById = (taskId: string) => {
    return tasks.find(task => task.id === taskId);
  };
  const createDraggingTask = (taskId: string) => {
    dispatch(setDraggingTaskId(taskId));
  };
  const clearDraggingTask = () => {
    dispatch(setDraggingTaskId(null));
  };
  const updateTaskSlotCount = (taskId: string, slotCount: number) => {
    dispatch(updateSlotCount({ id: taskId, slotCount }));
  };
  const createTask = (task: Task) => {
    dispatch(addTask(task));
  };

  const draggingTask = useMemo(() => {
    if (!draggingTaskId) return null;
    return getTaskById(draggingTaskId);
  }, [draggingTaskId]);

  return {
    tasks,
    scheduleTask,
    getTaskById,
    createDraggingTask,
    clearDraggingTask,
    updateTaskSlotCount,
    updateScheduledTask,
    createTask,
    draggingTaskId,
    draggingTask,
  };
}
