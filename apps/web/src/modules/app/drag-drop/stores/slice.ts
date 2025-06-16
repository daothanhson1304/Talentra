import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isDragOver: false,
};

const dragDropSlice = createSlice({
  name: 'dragDrop',
  initialState,
  reducers: {
    setIsDragOver: (state, action: PayloadAction<boolean>) => {
      state.isDragOver = action.payload;
    },
  },
});

export const { setIsDragOver } = dragDropSlice.actions;

export default dragDropSlice.reducer;
