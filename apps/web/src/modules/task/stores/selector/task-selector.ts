import { RootState } from '@/stores';

export const taskBySelectedEmployeeIdSelector = (state: RootState) =>
  state.task.editedTasks[state.employee.selectedEmployeeId ?? ''] ?? [];

export const editedTasksSelector = (state: RootState) => state.task.editedTasks;

export const originalTasksSelector = (state: RootState) =>
  state.task.originalTasks;

export const draggingTaskIdSelector = (state: RootState) =>
  state.task.draggingTaskId;

export const isSavingBulkTaskSelector = (state: RootState) =>
  state.task.isSavingBulkTask;
