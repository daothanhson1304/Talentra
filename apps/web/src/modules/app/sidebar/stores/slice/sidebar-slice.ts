import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidebarTab } from '../../types';

export interface SidebarState {
  activeTab: SidebarTab;
}

const initialState: SidebarState = {
  activeTab: SidebarTab.EMPLOYEE,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<SidebarTab>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = sidebarSlice.actions;
export default sidebarSlice.reducer;
