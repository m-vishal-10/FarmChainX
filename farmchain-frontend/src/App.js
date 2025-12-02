import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FarmerDashboard from './pages/FarmerDashboard';
import DistributorDashboard from './pages/DistributorDashboard';
import RetailerDashboard from './pages/RetailerDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [userRole, setUserRole] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setUserRole={setUserRole} />,
    },
    {
      path: "/register",
      element: <Register setUserRole={setUserRole} />,
    },
    {
      path: "/dashboard",
      element: <Dashboard userRole={userRole} setUserRole={setUserRole} />,
    },
    {
      path: "/farmer",
      element: <FarmerDashboard userRole={userRole} setUserRole={setUserRole} />,
    },
    {
      path: "/distributor",
      element: <DistributorDashboard userRole={userRole} setUserRole={setUserRole} />,
    },
    {
      path: "/retailer",
      element: <RetailerDashboard userRole={userRole} setUserRole={setUserRole} />,
    },
    {
      path: "/consumer",
      element: <ConsumerDashboard userRole={userRole} setUserRole={setUserRole} />,
    },
    {
      path: "/admin",
      element: <AdminDashboard userRole={userRole} setUserRole={setUserRole} />,
    },
  ], {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  });

  return <RouterProvider router={router} />;
}

export default App;
