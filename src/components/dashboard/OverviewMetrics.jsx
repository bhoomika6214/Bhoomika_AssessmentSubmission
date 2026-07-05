import React from "react";
import "./OverviewMetrics.css";

/**
 * `metrics` is whatever the API returns: [{ id, label, value }, ...].
 * Order is flexible per spec — we just render what we're given, we
 * don't hardcode which metrics exist.
 */
export default function OverviewMetrics({ metrics = [] }) {
  return (
    <section className="overview-metrics-section" role="region" aria-label="Overview metrics">
      <h2>Overview</h2>
      <div className="overview-metrics">
        {metrics.map((metric) => (
          <div className="metric-card" key={metric.id ?? metric.label}>
            <span className="metric-value">{metric.value}</span>
            <span className="metric-label">{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
