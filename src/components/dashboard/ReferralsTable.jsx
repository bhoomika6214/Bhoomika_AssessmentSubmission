import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import SortDropdown from "../common/SortDropdown";
import Pagination from "../common/Pagination";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/formatCurrency";
import { PAGE_SIZE } from "../../utils/constants";
import "./ReferralsTable.css";

export default function ReferralsTable({
  referrals,
  totalCount,
  totalPages,
  currentPage,
  setCurrentPage,
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  isLoading,
  error,
  refetch,
}) {
  const navigate = useNavigate();

  const handleRowClick = (referral) => {
    navigate(`/referral/${referral.id}`, { state: { referral } });
  };

  // Spec footer text: "Showing 1–10 of 50 entries" (en dash between numbers).
  const from = totalCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, totalCount);

  return (
    <section className="referrals-table-wrapper" aria-label="All referrals">
      <h2>All referrals</h2>

      <div className="referrals-toolbar">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <SortDropdown value={sortOrder} onChange={setSortOrder} />
      </div>

      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!error && isLoading && <LoadingSpinner label="Loading referrals..." />}

      {!error && !isLoading && referrals.length === 0 && (
        <EmptyState message="No matching entries" />
      )}

      {!error && !isLoading && referrals.length > 0 && (
        <>
          <table className="referrals-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral) => (
                <tr
                  key={referral.id}
                  onClick={() => handleRowClick(referral)}
                  className="referral-row"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRowClick(referral);
                  }}
                >
                  <td>{referral.name}</td>
                  <td>{referral.serviceName}</td>
                  <td>{formatDate(referral.date)}</td>
                  <td>{formatCurrency(referral.profit)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="table-summary">
            Showing {from}–{to} of {totalCount} entries
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}
