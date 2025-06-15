import { RootState } from '@/stores';

export const taskListSelector = (state: RootState) => state.task.items;
