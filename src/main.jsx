import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Navigate, useLocation, Outlet } from 'react-router-dom';
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
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// --- BRICK 1: CORRECTED PROTECTED ROUTE LOGIC ---
function ProtectedRoute() {
  const location = useLocation();
  // We now check for 'token' which is what our login API provides
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token, redirect to the landing page
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // If there is a token, allow access to the nested routes
  return <Outlet />;
}

// Basic Error Boundary
function ErrorBoundary() {
  return (
    <div className="p-4 text-red-500">
      <h2>Something went wrong</h2>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
}

// --- BRICK 2: CORRECTED ROUTER STRUCTURE ---
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    // The ProtectedRoute now acts as a wrapper for all protected children
    element: <ProtectedRoute />,
    children: [
      {
        path: '/app',
        element: <App />, // The App component contains the main layout (nav, sidebar)
        children: [
          // These routes will be rendered inside the App component's <Outlet />
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'journal', element: <JournalPage /> },
          { path: 'resources', element: <ResourcesPage /> },
          { path: 'community', element: <CommunityPage /> },
          { path: 'yoga', element: <YogaPage /> },
          { path: 'gym', element: <GymCenterPage /> },
          { path: 'consultation', element: <ConsultationPage /> },
          { path: 'ai', element: <ChatbotPage /> },
          { path: 'chat', element: <ChatPage /> },
        ],
      },
    ],
  },
  {
    // A catch-all route to redirect any other path to the landing page
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);

// Load Stripe with your publishable key (it's safe to be here)
const stripePromise = loadStripe('pk_test_51Rynl1LOYsWjVEkVpDhZBvnvav5FSxkMOrUmrhNT4NTu2rGylnRSUjyXkoKojWL1eyXV8MFN7j2vi8nfDvXfAL2i00dQSEvD6J');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
    </Elements>
  </StrictMode>
);