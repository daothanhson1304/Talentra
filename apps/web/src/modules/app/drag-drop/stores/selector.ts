import { RootState } from '@/stores';

export const isDragOverSelector = (state: RootState) =>
  state.dragDrop.isDragOver;
