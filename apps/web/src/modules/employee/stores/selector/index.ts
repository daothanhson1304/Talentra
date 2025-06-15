import { RootState } from '@/stores';

export const selectEmployees = (state: RootState) =>
  Object.values(state.employee);
