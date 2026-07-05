import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="app-header">
      <Link to="/" className="brand-link" aria-label="Go to dashboard home">
        Go Business
      </Link>
      <nav aria-label="Primary">
        <Link to="/">Home</Link>
      </nav>
      <button className="logout-btn" onClick={handleLogout}>
        Log out
      </button>
    </header>
  );
}
