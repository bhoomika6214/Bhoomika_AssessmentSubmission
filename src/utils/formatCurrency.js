// USD, no decimal digits, en-US grouping — e.g. 1234 -> "$1,234"
export function formatCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
