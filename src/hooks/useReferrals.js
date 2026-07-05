import { useState, useEffect, useCallback, useRef } from "react";
import { getReferrals } from "../api/referralsApi";
import { extractDashboardData } from "../utils/parseApiResponse";
import { useDebounce } from "./useDebounce";
import { SEARCH_DEBOUNCE_MS, PAGE_SIZE } from "../utils/constants";

/**
 * Single hook powering the whole Dashboard page. One GET /referrals call
 * (per search/sort combination) returns metrics, serviceSummary, the
 * referral share link/code, AND the referrals list all together — so
 * this hook owns all of that, not just the table's data.
 *
 * search & sort are server-side (new API call each time they change).
 * Pagination is purely client-side — we slice the already-fetched array.
 */
export function useReferrals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // spec default: newest first
  const [currentPage, setCurrentPage] = useState(1);

  const [metrics, setMetrics] = useState([]);
  const [serviceSummary, setServiceSummary] = useState(null);
  const [referralShare, setReferralShare] = useState(null);
  const [allReferrals, setAllReferrals] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, SEARCH_DEBOUNCE_MS);

  // Prevents a slow, stale request from overwriting a faster, newer one
  // when the user types quickly (classic race-condition edge case).
  const requestIdRef = useRef(0);

  const fetchData = useCallback(async () => {
    const thisRequestId = ++requestIdRef.current;
    setIsLoading(true);
    setError(null);
    try {
      const json = await getReferrals({ search: debouncedSearch, sort: sortOrder });
      if (thisRequestId !== requestIdRef.current) return;

      const parsed = extractDashboardData(json);
      setMetrics(parsed.metrics);
      setServiceSummary(parsed.serviceSummary);
      setReferralShare(parsed.referral);
      setAllReferrals(parsed.referrals);
    } catch (err) {
      if (thisRequestId !== requestIdRef.current) return;
      // Spec: surface message + status code when the backend includes one.
      const message = err.response?.data?.message || err.message || "Failed to load referrals.";
      const status = err.response?.status;
      setError(status ? `${message} (${status})` : message);
    } finally {
      if (thisRequestId === requestIdRef.current) setIsLoading(false);
    }
  }, [debouncedSearch, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset to page 1 whenever the underlying filtered/sorted set changes —
  // otherwise a user on page 3 who searches down to 2 results sees a blank table.
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, sortOrder]);

  const totalCount = allReferrals.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const pageReferrals = allReferrals.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return {
    metrics,
    serviceSummary,
    referralShare,
    referrals: pageReferrals,
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
    refetch: fetchData,
  };
}
