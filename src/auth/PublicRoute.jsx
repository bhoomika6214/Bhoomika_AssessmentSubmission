import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Inverse of PrivateRoute: guards /login specifically.
 * Spec requires authenticated users visiting /login to be redirected to /
 * (e.g. bookmarking /login shouldn't show the form again post-login).
 */
export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="page-loading">Checking session...</div>;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
