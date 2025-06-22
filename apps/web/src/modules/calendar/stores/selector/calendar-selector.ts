import { RootState } from '@/stores';

export const currentWeekSelector = (state: RootState) =>
  state.calendar.currentWeek;

export const currentWeekOffsetSelector = (state: RootState) =>
  state.calendar.currentWeekOffset;

export const snappedMinutesSelector = (state: RootState) =>
  state.calendar.snappedMinutes;

export const snappedHeightSelector = (state: RootState) =>
  state.calendar.snappedHeight;

export const widthPerDaySelector = (state: RootState) =>
  state.calendar.widthPerDay;

export const scrollTopSelector = (state: RootState) => state.calendar.scrollTop;
