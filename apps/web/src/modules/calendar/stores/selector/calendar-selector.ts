import { RootState } from '@/stores';

export const currentWeekSelector = (state: RootState) =>
  state.calendar.currentWeek;

export const currentWeekOffsetSelector = (state: RootState) =>
  state.calendar.currentWeekOffset;
