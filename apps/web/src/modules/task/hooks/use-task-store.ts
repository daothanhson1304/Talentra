import { useDispatch, useSelector } from 'react-redux';
import {
  draftTaskSelector,
  taskListSelector,
} from '../stores/selector/task-selector.js';
import {
  addTask,
  makeScheduledTask,
  setDraftTask,
  updateScheduledTask as updateScheduledTaskAction,
  updateSlotCount,
} from '../stores/slice/task-slice.js';
import { Task } from '@ttrak/types/task';

export default function useTaskStore() {
  const dispatch = useDispatch();
  const tasks = useSelector(taskListSelector);
  const draftTask = useSelector(draftTaskSelector);
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
  const updateDraftTask = (task: any) => {
    dispatch(setDraftTask(task));
  };
  const updateTaskSlotCount = (taskId: string, slotCount: number) => {
    dispatch(updateSlotCount({ id: taskId, slotCount }));
  };
  const createTask = (task: Task) => {
    dispatch(addTask(task));
  };
  return {
    tasks,
    scheduleTask,
    getTaskById,
    draftTask,
    updateDraftTask,
    updateTaskSlotCount,
    updateScheduledTask,
    createTask,
  };
}
