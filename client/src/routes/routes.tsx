import { createBrowserRouter } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/auth/LoginPage';
import NotFound from '../pages/NotFound';
import RegisterPage from '../pages/auth/RegisterPage';
import ProtectRoute from '../components/layout/ProtectRoute';
import CreateProduct from '../pages/CreateProduct';
import ProfilePage from '../pages/ProfilePage';
import ProductManagePage from '../pages/managements/ProductManagePage';
import AllSalesPage from '../pages/managements/AllSalesPage';
import SaleHistoryPage from '../pages/SaleHistoryPage';
import ManageSeller from '../pages/managements/ManageSeller';
import ManagePurchase from '../pages/managements/ManagePurchase';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Sidebar />,
    children: [
      {
        path: '/',
        element: (
          <ProtectRoute>
            <Dashboard />
          </ProtectRoute>
        ),
      },
      {
        path: 'create-product',
        element: (
          <ProtectRoute>
            <CreateProduct />
          </ProtectRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectRoute>
            <ProfilePage />
          </ProtectRoute>
        ),
      },
      {
        path: 'products',
        element: (
          <ProtectRoute>
            <ProductManagePage />
          </ProtectRoute>
        ),
      },
      {
        path: 'sales',
        element: (
          <ProtectRoute>
            <AllSalesPage />
          </ProtectRoute>
        ),
      },
      {
        path: 'sellers',
        element: (
          <ProtectRoute>
            <ManageSeller />
          </ProtectRoute>
        ),
      },
      {
        path: 'purchases',
        element: (
          <ProtectRoute>
            <ManagePurchase />
          </ProtectRoute>
        ),
      },
      {
        path: 'sales-history',
        element: (
          <ProtectRoute>
            <SaleHistoryPage />
          </ProtectRoute>
        ),
      },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '*', element: <NotFound /> },
]);
