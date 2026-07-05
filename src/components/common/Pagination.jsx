import React from "react";
import "./Pagination.css";

/**
 * Spec requires exact button labels "Previous"/"Next", numbered page
 * buttons when there's more than one page, Previous disabled on page 1,
 * Next disabled on the last page.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={num === currentPage ? "page-btn active" : "page-btn"}
          onClick={() => onPageChange(num)}
          aria-current={num === currentPage ? "page" : undefined}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
