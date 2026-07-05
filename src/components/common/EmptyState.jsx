import React from "react";
import "./EmptyState.css";

export default function EmptyState({ message = "No referrals found." }) {
  return (
    <div className="empty-state">
      <p>{message}</p>
    </div>
  );
}
