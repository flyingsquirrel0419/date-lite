/**
 * Return the start of the day (00:00:00.000) for the given date.
 *
 * @param date - The date to round down
 * @returns A new Date set to midnight
 *
 * @example
 * startOfDay(new Date(2026, 5, 30, 14, 30)) // Jun 30 2026 00:00:00.000
 */
export function startOfDay(date: Date): Date {
	const result = new Date(date);
	result.setHours(0, 0, 0, 0);
	return result;
}

/**
 * Return the end of the day (23:59:59.999) for the given date.
 *
 * @param date - The date to round up
 * @returns A new Date set to the last millisecond of the day
 */
export function endOfDay(date: Date): Date {
	const result = new Date(date);
	result.setHours(23, 59, 59, 999);
	return result;
}

/**
 * Return the start of the ISO week (Monday 00:00:00.000) for the given date.
 *
 * ISO 8601: weeks start on Monday.
 *
 * @param date - The date to round down
 * @returns A new Date set to Monday midnight of the same week
 *
 * @example
 * startOfWeek(new Date(2026, 5, 30)) // Monday Jun 29 00:00:00.000
 */
export function startOfWeek(date: Date): Date {
	const result = new Date(date);
	const day = result.getDay(); // 0=Sun ... 6=Sat
	// ISO 8601: week starts on Monday. diff: Mon=0, Tue=1, ..., Sun=6
	const diff = day === 0 ? 6 : day - 1;
	result.setDate(result.getDate() - diff);
	result.setHours(0, 0, 0, 0);
	return result;
}

/**
 * Return the end of the ISO week (Sunday 23:59:59.999) for the given date.
 *
 * @param date - The date to round up
 * @returns A new Date set to Sunday end-of-day of the same week
 */
export function endOfWeek(date: Date): Date {
	const start = startOfWeek(date);
	const result = new Date(start);
	result.setDate(result.getDate() + 6);
	result.setHours(23, 59, 59, 999);
	return result;
}

/**
 * Return the start of the month (1st day 00:00:00.000) for the given date.
 *
 * @param date - The date to round down
 * @returns A new Date set to the first day of the month at midnight
 */
export function startOfMonth(date: Date): Date {
	const result = new Date(date);
	result.setDate(1);
	result.setHours(0, 0, 0, 0);
	return result;
}

/**
 * Return the end of the month (last day 23:59:59.999) for the given date.
 *
 * Handles variable month lengths and leap years automatically.
 *
 * @param date - The date to round up
 * @returns A new Date set to the last day of the month at 23:59:59.999
 *
 * @example
 * endOfMonth(new Date(2026, 1, 15)) // Feb 28 2026 23:59:59.999
 * endOfMonth(new Date(2024, 1, 15)) // Feb 29 2024 23:59:59.999 (leap year)
 */
export function endOfMonth(date: Date): Date {
	const result = new Date(date);
	// Day 0 of next month = last day of current month
	result.setMonth(result.getMonth() + 1, 0);
	result.setHours(23, 59, 59, 999);
	return result;
}

/**
 * Return the start of the year (Jan 1 00:00:00.000) for the given date.
 *
 * @param date - The date to round down
 * @returns A new Date set to January 1 at midnight
 */
export function startOfYear(date: Date): Date {
	return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
}

/**
 * Return the end of the year (Dec 31 23:59:59.999) for the given date.
 *
 * @param date - The date to round up
 * @returns A new Date set to December 31 at 23:59:59.999
 */
export function endOfYear(date: Date): Date {
	return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
}
