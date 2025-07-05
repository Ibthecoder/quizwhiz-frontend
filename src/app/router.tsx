import Landing from '@/pages/Landing';
import SignUpPage from '@/pages/SignUpPage';
import Login from '@/pages/Login';
import Lobby from '@/pages/Lobby';
import Profile from '@/pages/Profile';
import Quiz from '@/pages/Quiz';
import QuizFeed from '@/pages/QuizFeed';
import NotFound from '@/pages/NotFound';
import Layout from '@/common/components/layout/Layout';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import VerifyEmail from '@/pages/VerifyEmail';
import AuthPage from '@/pages/AuthPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Landing />,
      },
      {
        path: 'auth',
        element: <AuthPage />,
        children: [
          {
            path: 'signup',
            element: <SignUpPage />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'verify-email',
            element: <VerifyEmail />,
          },
        ],
      },
      {
        path: 'lobby',
        element: <Lobby />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'quiz',
        element: <Quiz />,
      },
      {
        path: 'feed',
        element: <QuizFeed />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
