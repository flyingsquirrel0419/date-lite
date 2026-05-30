/**
 * Check if a date falls on a weekend (Saturday or Sunday).
 *
 * @param date - The date to check
 * @returns `true` if the date is Saturday or Sunday
 *
 * @example
 * isWeekend(new Date(2026, 5, 27)) // true (Saturday)
 */
export function isWeekend(date: Date): boolean {
	const day = date.getDay();
	return day === 0 || day === 6;
}

/**
 * Check if the year of the given date is a leap year.
 *
 * Follows Gregorian calendar rules:
 * - Divisible by 4 → leap year
 * - Divisible by 100 → NOT a leap year
 * - Divisible by 400 → leap year
 *
 * @param date - The date to check
 * @returns `true` if the year is a leap year
 *
 * @example
 * isLeapYear(new Date(2024, 0, 1)) // true
 * isLeapYear(new Date(1900, 0, 1)) // false (century, not ÷ 400)
 * isLeapYear(new Date(2000, 0, 1)) // true  (century, ÷ 400)
 */
export function isLeapYear(date: Date): boolean {
	const year = date.getFullYear();
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * Check if a Date object represents a valid date.
 *
 * Returns `false` for dates created from invalid strings
 * (e.g. `new Date('invalid')`) which have `NaN` timestamps.
 *
 * @param date - The date to check
 * @returns `true` if the Date is valid
 */
export function isValid(date: Date): boolean {
	return !isNaN(date.getTime());
}

/**
 * Get the number of days in the month of the given date.
 *
 * Handles leap-year February automatically.
 *
 * @param date - The date to query
 * @returns Number of days in the month (28–31)
 *
 * @example
 * getDaysInMonth(new Date(2026, 1, 1)) // 28 (non-leap February)
 * getDaysInMonth(new Date(2024, 1, 1)) // 29 (leap year February)
 */
export function getDaysInMonth(date: Date): number {
	const year = date.getFullYear();
	const month = date.getMonth();
	// Day 0 of next month = last day of current month
	return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the ISO 8601 week number of the year (1–53).
 *
 * ISO 8601 definition: weeks start on Monday, and week 1 is the week
 * containing the year's first Thursday.
 *
 * @param date - The date to query
 * @returns ISO week number (1–53)
 *
 * @example
 * getWeekOfYear(new Date(2026, 0, 1)) // 1
 */
export function getWeekOfYear(date: Date): number {
	const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	// Set to nearest Thursday (ISO week starts Monday)
	const dayNum = d.getDay(); // 0=Sun ... 6=Sat
	// ISO: Mon=1 ... Sun=7
	const isoDay = dayNum === 0 ? 7 : dayNum;
	d.setDate(d.getDate() + 4 - isoDay);
	// Get the Jan 1 of the year of that Thursday
	const yearStart = new Date(d.getFullYear(), 0, 1);
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
