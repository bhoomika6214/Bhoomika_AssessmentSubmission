// API sends ISO "YYYY-MM-DD". Spec requires display as "YYYY/MM/DD".
// A plain string replace avoids any timezone-shift bugs that would come
// from parsing into a Date object and reformatting (a classic gotcha:
// new Date("2024-01-01") can shift a day depending on local timezone).
export function formatDate(isoDate) {
  if (!isoDate) return "-";
  return isoDate.replace(/-/g, "/");
}
