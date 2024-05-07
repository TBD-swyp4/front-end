import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './protectedRoute/ProtectedRoute';

import * as P from '../pages';

export const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            index: true, // 하위에 다른 경로가 안붙을 때 보여줄 컴포넌트
            element: (
              <ProtectedRoute>
                <P.MainPage />
              </ProtectedRoute>
            ),
          },
          {
            path: '/login',
            element: <P.LoginPage />,
          },
          {
            path: '/dashboard',
            element: (
              <ProtectedRoute>
                <P.DashboardPage />
              </ProtectedRoute>
            ),
          },
          {
            path: '/add',
            element: (
              <ProtectedRoute>
                <P.AddExpensePage />
              </ProtectedRoute>
            ),
          },
          {
            path: '/expense',
            element: (
              <ProtectedRoute>
                <P.ExpenseListViewPage />
              </ProtectedRoute>
            ),
          },
          {
            path: '/expense/:id',
            element: (
              <ProtectedRoute>
                <P.ExpenseDetailViewPage />
              </ProtectedRoute>
            ),
          },
          {
            path: '/statistics',
            element: (
              <ProtectedRoute>
                <P.StatisticsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: '/setting',
            element: (
              <ProtectedRoute>
                <P.SettingPage />
              </ProtectedRoute>
            ),
          },
          {
            path: '*',
            element: <P.ErrorPage />,
          },
        ],
      },
    ],
  },
]);
