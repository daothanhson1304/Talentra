import { RootState } from '@/stores';

export const activeSidebarTabSelector = (state: RootState) =>
  state.sidebar.activeTab;
