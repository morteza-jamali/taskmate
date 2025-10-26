import { createBrowserRouter, redirect } from 'react-router';
import LoadingFallback from './components/LoadingFallback';

export const router = createBrowserRouter([
  {
    path: 'dashboard',
    lazy: {
      Component: async () =>
        (await import('./components/ProtectedPage')).ProtectedPage,
    },
    HydrateFallback: LoadingFallback,
    loader: async () => {
      // const { isLogedIn } = useUserInfo();

      // if (!isLogedIn()) {
      //   throw redirect('/login');
      // }

      return null;
    },
    children: [
      {
        path: 'home',
        lazy: {
          Component: async () => (await import('./pages/dashboard/Home')).Home,
        },
      },
      {
        path: 'tasks/new',
        lazy: {
          Component: async () =>
            (await import('./pages/dashboard/tasks/NewTask')).NewTask,
        },
      },
      // {
      //   path: 'login',
      //   lazy: {
      //     Component: async () => {
      //       return (await import('./components/ProtectedPage')).ProtectedPage;
      //     },
      //   },
      //   loader: async () => {
      //     const { isLogedIn } = useUserInfo();

      //     if (isLogedIn()) {
      //       throw redirect('/');
      //     }

      //     return { page: 'login' };
      //   },
      // },
    ],
  },
  {
    path: '*',
    lazy: {
      Component: async () => (await import('./pages/404')).NotFound404,
    },
  },
]);

export default router;
