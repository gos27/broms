import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div className="mt-10 text-center">Loading...</div>;

  // If not logged in or not an admin, redirect to the public dashboard
  if (!user || !isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
};

export default AdminRoute;
