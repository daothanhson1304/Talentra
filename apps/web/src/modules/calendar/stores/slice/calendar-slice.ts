import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWeek } from '../../helpers/date';

export interface CalendarState {
  currentWeekOffset: number;
  currentWeek: number;
  snappedMinutes: number;
  snappedHeight: number;
  widthPerDay: number;
  scrollTop: number;
}

const initialState: CalendarState = {
  currentWeekOffset: 0,
  currentWeek: getWeek(new Date().toISOString()),
  snappedMinutes: 5,
  snappedHeight: 48,
  widthPerDay: 0,
  scrollTop: 7 * (48 * 2), // set default scroll top to 7 days,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCurrentWeekOffset: (state, action: PayloadAction<number>) => {
      state.currentWeekOffset = action.payload;
    },
    setCurrentWeek: (state, action: PayloadAction<number>) => {
      state.currentWeek = action.payload;
    },
    setWidthPerDay: (state, action: PayloadAction<number>) => {
      state.widthPerDay = action.payload;
    },
    setScrollTop: (state, action: PayloadAction<number>) => {
      state.scrollTop = action.payload;
    },
  },
});

export const { setCurrentWeekOffset, setWidthPerDay, setScrollTop } =
  calendarSlice.actions;
export default calendarSlice.reducer;
