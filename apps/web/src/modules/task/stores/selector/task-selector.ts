import { RootState } from '@/stores';

export const taskListSelector = (state: RootState) => state.task.items;

export const draftTaskSelector = (state: RootState) => state.task.draftTask;
