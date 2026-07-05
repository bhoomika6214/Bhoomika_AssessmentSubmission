import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Route guard. Renders nested routes (via <Outlet/>) only if authenticated.
 * Waits for isLoading to resolve first, otherwise a hard refresh on a
 * protected route would flash-redirect to /login before the cookie check
 * even runs.
 */
export default function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="page-loading">Checking session...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
