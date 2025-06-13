import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getWeek } from '../../helpers/date';

export interface CalendarState {
  currentWeekOffset: number;
  currentWeek: number;
}

const initialState: CalendarState = {
  currentWeekOffset: 0,
  currentWeek: getWeek(new Date().toISOString()),
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
  },
});

export const { setCurrentWeekOffset } = calendarSlice.actions;
export default calendarSlice.reducer;
