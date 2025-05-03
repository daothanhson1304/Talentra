import { RootState } from '@/stores';

export const getTaskListSelector = (state: RootState) => state.task.items;
