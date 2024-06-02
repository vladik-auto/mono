import { createBrowserRouter, redirect } from 'react-router-dom';
import { LoginPage, MainPage, MyPage, RegisterPage, StatisticsPage, UploadPage } from '@pages/ui';
import { Toolbar } from '@widgets/ui';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Toolbar />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: 'upload',
                element: <UploadPage />,
            },
            {
                path: 'statistics',
                element: <StatisticsPage />,
            },
            {
                path: 'user',
                element: <MyPage />,
            },
        ],
    },
    {
        path: '/auth',
        children: [
            {
                index: true,
                loader: async () => redirect('/auth/login'),
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },


]);