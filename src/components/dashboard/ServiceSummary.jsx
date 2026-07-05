import React from "react";
import "./ServiceSummary.css";

/**
 * `summary` shape from API: { service, yourReferrals, activeReferrals, totalRefEarnings }
 * Labels below are exact copy required by spec — do not rename.
 */
export default function ServiceSummary({ summary }) {
  if (!summary) return null;

  const rows = [
    { label: "Service", value: summary.service },
    { label: "Your Referrals", value: summary.yourReferrals },
    { label: "Active Referrals", value: summary.activeReferrals },
    { label: "Total Ref. Earnings", value: summary.totalRefEarnings },
  ];

  return (
    <section className="service-summary" aria-label="Service summary">
      <h2>Service summary</h2>
      <ul>
        {rows.map((row) => (
          <li key={row.label}>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
