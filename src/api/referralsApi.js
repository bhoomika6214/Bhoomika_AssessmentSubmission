import axiosInstance from "./axiosInstance";

/**
 * One call returns the full combined dashboard payload — metrics,
 * serviceSummary, referral link/code, AND the referrals array — all in
 * one response (per spec Section 6). Pagination is NOT server-side;
 * the API always returns the complete filtered/sorted set.
 */
export async function getReferrals({ search, sort } = {}) {
  const params = {};
  if (search) params.search = search; // `q` is interchangeable but only one is needed
  if (sort) params.sort = sort; // "asc" | "desc", default desc
  const response = await axiosInstance.get("/referrals", { params });
  return response.data;
}

/** Single referral by id, same endpoint, same auth header. */
export async function getReferralById(id) {
  const response = await axiosInstance.get("/referrals", { params: { id } });
  return response.data;
}
