import React from "react";
import { useReferrals } from "../hooks/useReferrals";
import OverviewMetrics from "../components/dashboard/OverviewMetrics";
import ServiceSummary from "../components/dashboard/ServiceSummary";
import ReferralLinkShare from "../components/dashboard/ReferralLinkShare";
import ReferralsTable from "../components/dashboard/ReferralsTable";
import "./DashboardPage.css";

export default function DashboardPage() {
  const {
    metrics,
    serviceSummary,
    referralShare,
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
  } = useReferrals();

  return (
    <div>
      <h1>Referral Dashboard</h1>
      <p className="dashboard-subtitle">
        Track your referrals, earnings, and partner activity in one place.
      </p>

      <OverviewMetrics metrics={metrics} />
      <ReferralLinkShare share={referralShare} />
      <ServiceSummary summary={serviceSummary} />

      <ReferralsTable
        referrals={referrals}
        totalCount={totalCount}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    </div>
  );
}
