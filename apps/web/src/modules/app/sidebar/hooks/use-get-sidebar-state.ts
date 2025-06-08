import { useSelector } from 'react-redux';
import { activeSidebarTabSelector } from '../stores/selector/sidebar-selector';

const useGetSidebarState = () => {
  const activeTab = useSelector(activeSidebarTabSelector);
  return {
    activeTab,
  };
};

export default useGetSidebarState;
