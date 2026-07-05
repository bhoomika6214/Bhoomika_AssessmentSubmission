import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <span className="footer-brand">Go Business</span>
      <nav aria-label="Footer">
        <a href="#about">About</a>
        <a href="#privacy">Privacy</a>
      </nav>
      <p className="footer-copyright">© 2024 Go Business</p>
    </footer>
  );
}
