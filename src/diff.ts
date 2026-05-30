import { startOfDay } from "./startEnd";

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60000;
const MS_PER_HOUR = 3600000;
const MS_PER_DAY = 86400000;

/**
 * Get the number of full calendar days between two dates.
 *
 * Uses calendar-day semantics (compares midnight-to-midnight),
 * so same-day dates always return 0 regardless of time.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @returns Number of full days (positive if dateLeft > dateRight)
 *
 * @example
 * differenceInDays(new Date(2026, 5, 30), new Date(2026, 5, 28)) // 2
 */
export function differenceInDays(dateLeft: Date, dateRight: Date): number {
	const left = startOfDay(dateLeft);
	const right = startOfDay(dateRight);
	return Math.round((left.getTime() - right.getTime()) / MS_PER_DAY);
}

/**
 * Get the number of full hours between two dates.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @returns Number of full hours (positive if dateLeft > dateRight)
 */
export function differenceInHours(dateLeft: Date, dateRight: Date): number {
	return Math.round((dateLeft.getTime() - dateRight.getTime()) / MS_PER_HOUR);
}

/**
 * Get the number of full minutes between two dates.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @returns Number of full minutes (positive if dateLeft > dateRight)
 */
export function differenceInMinutes(dateLeft: Date, dateRight: Date): number {
	return Math.round((dateLeft.getTime() - dateRight.getTime()) / MS_PER_MINUTE);
}

/**
 * Get the number of full seconds between two dates.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @returns Number of full seconds (positive if dateLeft > dateRight)
 */
export function differenceInSeconds(dateLeft: Date, dateRight: Date): number {
	return Math.round((dateLeft.getTime() - dateRight.getTime()) / MS_PER_SECOND);
}

/**
 * Get the number of full calendar months between two dates.
 *
 * Based on year and month values only — day and time are not considered.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @returns Number of full calendar months (positive if dateLeft > dateRight)
 *
 * @example
 * differenceInMonths(new Date(2026, 5, 15), new Date(2026, 0, 15)) // 5
 */
export function differenceInMonths(dateLeft: Date, dateRight: Date): number {
	const yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
	const monthDiff = dateLeft.getMonth() - dateRight.getMonth();
	return yearDiff * 12 + monthDiff;
}

/**
 * Get the number of full calendar years between two dates.
 *
 * Accounts for month and day — if the day hasn't been reached yet
 * in the target year, the result is reduced by one.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @returns Number of full calendar years (positive if dateLeft > dateRight)
 */
export function differenceInYears(dateLeft: Date, dateRight: Date): number {
	const yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
	const monthDiff = dateLeft.getMonth() - dateRight.getMonth();
	if (
		monthDiff < 0 ||
		(monthDiff === 0 && dateLeft.getDate() < dateRight.getDate())
	) {
		return yearDiff - 1;
	}
	return yearDiff;
}
