import { Task } from '@/modules/task/stores/slice/task-slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DragState {
  activeId: string | null;
  overId: string | null;
}

const initialState: DragState = {
  activeId: null,
  overId: null,
};

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    setActiveId: (state, action: PayloadAction<string | null>) => {
      state.activeId = action.payload;
    },
    setOverId: (state, action: PayloadAction<string | null>) => {
      state.overId = action.payload;
    },
  },
});

export const { setActiveId, setOverId } = dragSlice.actions;
export default dragSlice.reducer;
