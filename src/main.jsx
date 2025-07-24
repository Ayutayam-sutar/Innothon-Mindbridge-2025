
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import App from './App';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import './index.css';
import JournalPage from './components/JournalPage.jsx';
import ResourcesPage from './components/ResourcesPage.jsx';
import YogaPage from './components/YogaPage.jsx';
import GymCenterPage from './components/GymCenterPage.jsx';
import ConsultationPage from './components/ConsultationPage.jsx';
import ChatbotPage from './components/AiAssistant.jsx';
import ChatPage from './components/ChatPage.jsx';
import CommunityPage from './components/CommunityPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorBoundary />, // Add your error boundary component
  },
  {
    path: '/app',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        // Add if you need loading states:
        // loader: dashboardLoader,
        // errorElement: <DashboardError />
      },
      {
        path: 'journal',
        element: <JournalPage />,
      },
      {
        path: 'resources',
        element: <ResourcesPage />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: 'yoga',
        element: <YogaPage />,
      },
      {
        path: 'gym',
        element: <GymCenterPage />,
      },
      {
        path: 'consultation', // Fixed typo (was "consultation")
        element: <ConsultationPage />,
      },
      {
        path: 'ai',
        element: <ChatbotPage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: '*',
        element: <Navigate to="dashboard" replace />,
      }
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);

function ProtectedRoute() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return <App />;
}

// Basic Error Boundary (create a proper one)
function ErrorBoundary() {
  return (
    <div className="p-4 text-red-500">
      <h2>Something went wrong</h2>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);