import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../pages/Layout";
import { Booking } from "../pages/booking/Booking";
import { History } from "../pages/history/History";
import HomePage from "../pages/home";

const routes = [
    {
        path: '/',
        element: <MainLayout><HomePage /></MainLayout>,
    },
    {
        path: '/booking',
        element: <MainLayout><Booking /></MainLayout>,
    },
    {
        path: '/history',
        element: <MainLayout><History /></MainLayout>,
    },

];

export const router = createBrowserRouter(routes);