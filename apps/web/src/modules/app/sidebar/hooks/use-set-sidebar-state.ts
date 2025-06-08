import { useDispatch } from 'react-redux';
import { setActiveTab } from '../stores/slice/sidebar-slice';
import { SidebarTab } from '../types';

const useSetSidebarState = () => {
  const dispatch = useDispatch();
  return { setActiveTab: (tab: SidebarTab) => dispatch(setActiveTab(tab)) };
};

export default useSetSidebarState;
