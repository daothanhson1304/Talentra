import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWeek } from '../../helpers/date';

export interface CalendarState {
  currentWeekOffset: number;
  currentWeek: number;
  snappedMinutes: number;
  snappedHeight: number;
  widthPerDay: number;
}

const initialState: CalendarState = {
  currentWeekOffset: 0,
  currentWeek: getWeek(new Date().toISOString()),
  snappedMinutes: 5,
  snappedHeight: 48,
  widthPerDay: 0,
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
  },
});

export const { setCurrentWeekOffset, setWidthPerDay } = calendarSlice.actions;
export default calendarSlice.reducer;
