import { lazy } from 'react';
import { useLocation } from 'react-router';

const NotFound404 = lazy(() => import('../pages/404'));
const Layout = lazy(() => import('../components/DashboardLayout'));

const routes = ['/dashboard/tasks/new', '/dashboard/home'];

export const ProtectedPage: React.FC = () => {
  const { pathname } = useLocation();

  return routes.includes(pathname) ? <Layout /> : <NotFound404 />;
};

export default ProtectedPage;
