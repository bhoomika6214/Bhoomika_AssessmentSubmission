import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./LoginPage.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  // Spec: "Sign in remains enabled regardless of field contents; the POST
  // request fires on every click, and the API's own error response governs
  // whether the user proceeds." So: no `required` attributes, no disabling
  // based on empty fields — every click hits the API and lets IT decide.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      // Failure contract: { message: "Invalid email or password" }
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h1>Go Business</h1>
        <p className="login-tagline">Sign in to open your referral dashboard.</p>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
