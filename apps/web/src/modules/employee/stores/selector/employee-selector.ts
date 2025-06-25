import { RootState } from '@/stores';

export const selectedEmployeeIdSelector = (state: RootState) =>
  state.employee.selectedEmployeeId;
