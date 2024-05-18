import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import App from '../App';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import MainPage from '../pages/main/MainPage';
import LoginPage from '../pages/login/LoginPage';
import ErrorPage from '../pages/error/ErrorPage';
import AuthPage from '../pages/auth/AuthPage.tsx';
import Loading from '@components/information/Loading';

// 바로 로딩되지 않아도 되는 컴포넌트 lazy loading 추가
const ExpenseListViewPage = lazy(() => import('../pages/expenseListView/ExpenseListViewPage'));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const AddExpensePage = lazy(() => import('../pages/addExpense/AddExpensePage.tsx'));
const ExpenseDetailViewPage = lazy(
  () => import('../pages/expenseDetailView/ExpenseDetailViewPage'),
);
const StatisticsPage = lazy(() => import('../pages/statistics/StatisticsPage'));
const SettingPage = lazy(() => import('../pages/setting/SettingPage'));

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
                <MainPage />
              </ProtectedRoute>
            ),
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/dashboard',
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: '/add',
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <AddExpensePage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: '/expense',
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <ExpenseListViewPage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: '/expense/:id',
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <ExpenseDetailViewPage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: '/statistics',
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <StatisticsPage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: '/setting',
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <SettingPage />
                </ProtectedRoute>
              </Suspense>
            ),
          },
          {
            path: '/auth',
            element: (
              <Suspense fallback={<Loading />}>
                <AuthPage />
              </Suspense>
            ),
          },
          {
            path: '*',
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);
