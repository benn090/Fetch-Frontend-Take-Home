import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import MainLayout from './layouts/main';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import MainAppPage from './pages/MainAppPage';
import DogListPage from './pages/DogListPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <MainAppPage />},
        { path: '/search/', element: <DogListPage /> },
        { path: '/search/:breedsParam', element: <DogListPage /> },
        { path: '/search/:breedsParam/:page', element: <DogListPage /> },
        { path: '/search/:breedsParam/:page/:sortParam', element: <DogListPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
