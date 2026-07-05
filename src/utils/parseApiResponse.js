/**
 * The API wraps its payload as { success, data: {...} }, but the spec
 * explicitly says the parser must ALSO tolerate metrics/serviceSummary/
 * referral/referrals sitting directly on the root object (no `data`
 * wrapper). Rather than branch everywhere this is used, we normalize
 * once here.
 */
export function extractDashboardData(json) {
  const container = json?.data ?? json ?? {};
  return {
    metrics: container.metrics ?? [],
    serviceSummary: container.serviceSummary ?? null,
    referral: container.referral ?? null,
    referrals: Array.isArray(container.referrals) ? container.referrals : [],
  };
}

/**
 * For GET /referrals?id=X, the spec notes the single-referral payload is
 * often the row itself (an object with id/name/serviceName/date/profit)
 * rather than nested inside a `referrals` array. We check both shapes,
 * matching by id when a `referrals` array is present.
 */
export function extractSingleReferral(json, id) {
  const container = json?.data ?? json ?? {};

  if (Array.isArray(container.referrals)) {
    const match = container.referrals.find((r) => String(r.id) === String(id));
    if (match) return match;
  }

  if (container.id !== undefined && String(container.id) === String(id)) {
    return container;
  }

  // Some backends return the row as the sole entry even without a
  // guaranteed id match on containers lacking `referrals` — treat a bare
  // object with the right shape as a match if ids weren't comparable.
  if (container.id !== undefined && !Array.isArray(container.referrals)) {
    return container;
  }

  return null;
}
