import AppSidebar from './app-sidebar';
import { Outlet } from 'react-router';

export default function AppLayout() {
  return (
    <div className='flex h-screen'>
      <AppSidebar />
      <Outlet />
    </div>
  );
}
