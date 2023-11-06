/**
 * @param value Number to format
 * @returns Human readable currency text
 */
export function getFormattedCurrency(value: number | undefined) {
  if (value === undefined) {
    return "";
  }

  return new Intl.NumberFormat([], {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
