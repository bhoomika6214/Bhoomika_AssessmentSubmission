import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { getReferralById } from "../api/referralsApi";
import { extractSingleReferral } from "../utils/parseApiResponse";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { formatDate } from "../utils/formatDate";
import { formatCurrency } from "../utils/formatCurrency";
import "./ReferralDetailsPage.css";

/**
 * Stale-while-revalidate: if we arrived via a table row click,
 * location.state.referral already has the data, so we render it
 * immediately and revalidate in the background. Direct URL visits/
 * refreshes have no state, so we show a spinner while fetching.
 *
 * If the API can't resolve a row for this id (wrong id, missing param,
 * unexpected shape) — per spec — we show "Referral not found" rather
 * than the site-wide 404 page. This is a details-page-local state, not
 * a route-level 404.
 */
export default function ReferralDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const cachedReferral = location.state?.referral;

  const [referral, setReferral] = useState(cachedReferral || null);
  const [isLoading, setIsLoading] = useState(!cachedReferral);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchDetails() {
      try {
        const json = await getReferralById(id);
        const match = extractSingleReferral(json, id);
        if (!isMounted) return;
        if (match) {
          setReferral(match);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchDetails();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading && !referral) {
    return <LoadingSpinner label="Loading referral details..." />;
  }

  if (notFound && !referral) {
    return (
      <div className="referral-details">
        <h1>Referral not found</h1>
        <Link to="/">← Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="referral-details">
      <h1>Referral Details</h1>
      <h2>{referral.name}</h2>

      <dl className="details-list">
        <div className="details-row">
          <dt>Referral ID</dt>
          <dd>{referral.id}</dd>
        </div>
        <div className="details-row">
          <dt>Service Name</dt>
          <dd>{referral.serviceName}</dd>
        </div>
        <div className="details-row">
          <dt>Date</dt>
          <dd>{formatDate(referral.date)}</dd>
        </div>
        <div className="details-row">
          <dt>Profit</dt>
          <dd>{formatCurrency(referral.profit)}</dd>
        </div>
      </dl>

      <Link to="/" className="back-link">
        ← Back to dashboard
      </Link>
    </div>
  );
}
