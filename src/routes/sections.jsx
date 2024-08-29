import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const CompletedOrdersPage = lazy(() => import('src/pages/CompletedOrdersPage'));
export const CurrentOrdersPage = lazy(() => import('src/pages/CurrentOrdersPage'));
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'order', element: <IndexPage /> },
        { path: 'Completed', element: <CompletedOrdersPage /> },
        { path: 'current-orders', element: <CurrentOrdersPage /> },
      ],
    },
  
  ]);

  return routes;
}
