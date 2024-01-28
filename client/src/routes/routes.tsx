import { createBrowserRouter } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import NotFound from '../pages/NotFound';
import RegisterPage from '../pages/RegisterPage';
import ProtectRoute from '../components/layout/ProtectRoute';
import CreateProduct from '../pages/CreateProduct';
import ProfilePage from '../pages/ProfilePage';
import ProductManagePage from '../pages/ProductManagePage';
import AllSalesPage from '../pages/AllSalesPage';
import SaleHistoryPage from '../pages/SaleHistoryPage';

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
