import React from "react";
import "./ErrorMessage.css";

export default function ErrorMessage({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="error-message" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
          Try again
        </button>
      )}
    </div>
  );
}
