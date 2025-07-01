import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import { ROUTES } from './constants';
import App from './App';
import { LoginForm } from './pages/auth/login';
import { GalleryVerticalEnd } from 'lucide-react';

const HomePage = lazy(() => import('@/pages/home'));
const EmployeeListPage = lazy(() => import('@/pages/management/employee-list'));
const EmployeeDetailPage = lazy(
  () => import('@/pages/management/employee-detail')
);

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <App />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <HomePage />,
        index: true,
      },
      {
        path: ROUTES.EMPLOYEE_MANAGEMENT,
        children: [
          {
            element: <EmployeeListPage />,
            index: true,
          },
          {
            path: ROUTES.EMPLOYEE_DETAIL,
            element: <EmployeeDetailPage />,
          },
        ],
      },
      {
        path: ROUTES.LINK,
        element: (
          <div className='flex-1 flex items-center justify-center bg-layer1'>
            Coming soon
          </div>
        ),
      },
    ],
  },
  {
    path: ROUTES.AUTH.LOGIN,
    element: (
      <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
        <div className='flex w-full max-w-sm flex-col gap-6'>
          <div className='flex items-center gap-2 self-center font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            Talentra
          </div>
          <LoginForm />
        </div>
      </div>
    ),
  },
]);

export default router;
