/**
 * @param value Date value to format
 * @returns Human readable date text
 */
export function getFormattedTimestamp(value: string | undefined) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat([], {
    timeStyle: "short",
    dateStyle: "medium",
  }).format(Date.parse(value));
}
