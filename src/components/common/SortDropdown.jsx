import React from "react";
import "./SortDropdown.css";

/**
 * Spec requires the visible label text to include "Sort by date", and
 * option values to be exactly "asc"/"desc" since those are sent straight
 * through as query params.
 */
export default function SortDropdown({ value, onChange }) {
  return (
    <label className="sort-label">
      Sort by date
      <select
        className="sort-dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="desc">Newest first</option>
        <option value="asc">Oldest first</option>
      </select>
    </label>
  );
}
