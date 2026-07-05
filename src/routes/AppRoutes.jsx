import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import PublicRoute from "../auth/PublicRoute";
import Layout from "../components/layout/Layout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ReferralDetailsPage from "../pages/ReferralDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";

/**
 * Ordering matters:
 * - /login is public but wrapped in PublicRoute, so an already-authenticated
 *   user visiting it gets redirected to / instead of seeing the form again.
 * - Protected routes nest under PrivateRoute -> Layout so the auth guard
 *   and shared header/footer are defined once.
 * - /dashboard/referrals is optional per spec — just redirects to the
 *   same dashboard.
 * - "*" (404) is last and sits OUTSIDE PrivateRoute, so an unauthenticated
 *   user hitting a garbage URL sees 404, not a forced login redirect.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/referral/:id" element={<ReferralDetailsPage />} />
          <Route path="/dashboard/referrals" element={<Navigate to="/" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
