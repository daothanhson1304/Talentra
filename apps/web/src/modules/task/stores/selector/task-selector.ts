import { RootState } from '@/stores';

export const taskListSelector = (state: RootState) => state.task.items;

export const draggingTaskIdSelector = (state: RootState) =>
  state.task.draggingTaskId;
