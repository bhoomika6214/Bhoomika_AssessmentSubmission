import React, { createContext, useState, useEffect, useCallback } from "react";
import { getToken, setToken, removeToken } from "./cookieUtils";
import { signIn as signInApi } from "../api/authApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(Boolean(token));
    setIsLoading(false);
  }, []);

  const login = useCallback(async ({ email, password }) => {
    // Let axios throw on non-2xx (e.g. 401 "Invalid email or password") —
    // the caller (LoginPage) reads err.response.data.message directly.
    const data = await signInApi({ email, password });
    // Confirmed contract: token lives at data.data.token (nested).
    const token = data?.data?.token;
    if (!token) {
      // Defensive: a 200 response that doesn't actually contain a token
      // should still be treated as a failed login, not a silent success.
      throw new Error("Login response did not include a token.");
    }
    setToken(token);
    setIsAuthenticated(true);
    return data;
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setIsAuthenticated(false);
  }, []);

  const value = { isAuthenticated, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
