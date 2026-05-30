/**
 * Check if dateLeft is chronologically before dateRight.
 *
 * @param dateLeft - The date to compare
 * @param dateRight - The date to compare against
 * @returns `true` if dateLeft is before dateRight
 *
 * @example
 * isBefore(new Date(2026, 0, 1), new Date(2026, 0, 2)) // true
 */
export function isBefore(dateLeft: Date, dateRight: Date): boolean {
  return dateLeft.getTime() < dateRight.getTime();
}

/**
 * Check if dateLeft is chronologically after dateRight.
 *
 * @param dateLeft - The date to compare
 * @param dateRight - The date to compare against
 * @returns `true` if dateLeft is after dateRight
 *
 * @example
 * isAfter(new Date(2026, 0, 2), new Date(2026, 0, 1)) // true
 */
export function isAfter(dateLeft: Date, dateRight: Date): boolean {
  return dateLeft.getTime() > dateRight.getTime();
}

/**
 * Check if two dates represent the same instant (same millisecond).
 *
 * @param dateLeft - First date
 * @param dateRight - Second date
 * @returns `true` if both dates have the same timestamp
 */
export function isEqual(dateLeft: Date, dateRight: Date): boolean {
  return dateLeft.getTime() === dateRight.getTime();
}

/**
 * Check if two dates fall on the same calendar day.
 *
 * Compares year, month, and date — time is ignored.
 *
 * @param dateLeft - First date
 * @param dateRight - Second date
 * @returns `true` if both dates are on the same calendar day
 *
 * @example
 * isSameDay(new Date(2026, 0, 15, 0, 0), new Date(2026, 0, 15, 23, 59)) // true
 */
export function isSameDay(dateLeft: Date, dateRight: Date): boolean {
  return (
    dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth() &&
    dateLeft.getDate() === dateRight.getDate()
  );
}

/**
 * Check if two dates are in the same calendar month.
 *
 * Compares year and month — day and time are ignored.
 *
 * @param dateLeft - First date
 * @param dateRight - Second date
 * @returns `true` if both dates are in the same year and month
 */
export function isSameMonth(dateLeft: Date, dateRight: Date): boolean {
  return (
    dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
  );
}
