import React from "react";
import "./SearchBar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-bar"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Name or service…"
      aria-label="Search referrals"
    />
  );
}
