import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EmployeeState {
  selectedEmployeeId: string | null;
}

const initialState: EmployeeState = {
  selectedEmployeeId: null,
};

const employeeSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSelectedEmployeeId: (state, action: PayloadAction<string | null>) => {
      state.selectedEmployeeId = action.payload;
    },
  },
});

export const { setSelectedEmployeeId } = employeeSlice.actions;
export default employeeSlice.reducer;
