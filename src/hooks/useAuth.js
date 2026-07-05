import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

// Small convenience hook so components do `useAuth()` instead of
// `useContext(AuthContext)` everywhere, and so we can throw a clear
// error if someone forgets to wrap the app in <AuthProvider>.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
