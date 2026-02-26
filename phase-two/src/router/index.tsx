import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { MainLayout } from "../pages/Layout";
import { NotFound } from "../pages/NotFound";
import { Spin } from 'antd';

const HomePage = lazy(() => import('../pages/home'));
const Booking = lazy(() => import('../pages/booking/Booking').then(module => ({ default: module.Booking })));
const History = lazy(() => import('../pages/history/History').then(module => ({ default: module.History })));

const loadingElement = (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" />
  </div>
);

const routes = [
    {
        path: '/',
        element: <MainLayout><Suspense fallback={loadingElement}><HomePage /></Suspense></MainLayout>,
    },
    {
        path: '/booking',
        element: <MainLayout><Suspense fallback={loadingElement}><Booking /></Suspense></MainLayout>,
    },
    {
        path: '/history',
        element: <MainLayout><Suspense fallback={loadingElement}><History /></Suspense></MainLayout>,
    },
    {
        path: '*',
        element: <NotFound />,
    },

];

export const router = createBrowserRouter(routes);