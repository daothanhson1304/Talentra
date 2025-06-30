import { createBrowserRouter } from 'react-router';
import { lazy } from 'react';
import { ROUTES } from './constants';
import App from './App';
import { LoginForm } from './pages/auth/login';

const HomePage = lazy(() => import('@/pages/home'));
const EmployeeManagementPage = lazy(
  () => import('@/pages/employee-management')
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
        element: <EmployeeManagementPage />,
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
      <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
        <div className='w-full max-w-sm md:max-w-3xl'>
          <LoginForm />
        </div>
      </div>
    ),
  },
]);

export default router;
