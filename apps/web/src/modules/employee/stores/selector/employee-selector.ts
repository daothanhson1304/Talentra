import { RootState } from '@/stores';

export const selectSelectedEmployeeId = (state: RootState) =>
  state.employee.selectedEmployeeId;

export const selectEmployees = (state: RootState) => state.employee.employees;
