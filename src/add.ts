/**
 * Add specified number of days to a date.
 *
 * Uses calendar-day semantics (midnight-to-midnight), not 24-hour intervals.
 * This means the time-of-day is preserved even across DST boundaries.
 *
 * @param date - The date to modify
 * @param amount - Number of days to add (negative to subtract)
 * @returns A new Date with the days added
 *
 * @example
 * addDays(new Date(2026, 0, 15), 7) // Jan 22, 2026
 */
export function addDays(date: Date, amount: number): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + amount);
	return result;
}

/**
 * Add specified number of months to a date.
 *
 * If the resulting month has fewer days, the day is clamped to the last day
 * of that month. For example: Jan 31 + 1 month = Feb 28 (or 29 in leap year).
 * This matches date-fns behavior.
 *
 * @param date - The date to modify
 * @param amount - Number of months to add (negative to subtract)
 * @returns A new Date with the months added
 *
 * @example
 * addMonths(new Date(2026, 0, 31), 1) // Feb 28, 2026 (clamped)
 */
export function addMonths(date: Date, amount: number): Date {
	const result = new Date(date);
	const targetMonth = result.getMonth() + amount;
	result.setMonth(targetMonth);
	// Handle month overflow: e.g. Jan 31 + 1 month should not become Mar 3
	if (result.getMonth() !== ((targetMonth % 12) + 12) % 12) {
		result.setDate(0); // last day of previous month
	}
	return result;
}

/**
 * Add specified number of years to a date.
 *
 * Handles the leap-year edge case: Feb 29 is clamped to Feb 28 in non-leap years.
 *
 * @param date - The date to modify
 * @param amount - Number of years to add (negative to subtract)
 * @returns A new Date with the years added
 *
 * @example
 * addYears(new Date(2024, 1, 29), 1) // Feb 28, 2025 (leap → non-leap)
 */
export function addYears(date: Date, amount: number): Date {
	const result = new Date(date);
	const targetYear = result.getFullYear() + amount;
	// Handle Feb 29 → Feb 28 in non-leap year BEFORE setFullYear
	// because setFullYear auto-rolls to Mar 1
	if (
		date.getMonth() === 1 &&
		date.getDate() === 29 &&
		!isLeapYearHelper(targetYear)
	) {
		result.setDate(28);
	}
	result.setFullYear(targetYear);
	return result;
}

/**
 * Add specified number of hours to a date.
 *
 * @param date - The date to modify
 * @param amount - Number of hours to add
 * @returns A new Date with the hours added
 */
export function addHours(date: Date, amount: number): Date {
	const result = new Date(date);
	result.setTime(result.getTime() + amount * 3600000);
	return result;
}

/**
 * Add specified number of minutes to a date.
 *
 * @param date - The date to modify
 * @param amount - Number of minutes to add
 * @returns A new Date with the minutes added
 */
export function addMinutes(date: Date, amount: number): Date {
	const result = new Date(date);
	result.setTime(result.getTime() + amount * 60000);
	return result;
}

/**
 * Add specified number of seconds to a date.
 *
 * @param date - The date to modify
 * @param amount - Number of seconds to add
 * @returns A new Date with the seconds added
 */
export function addSeconds(date: Date, amount: number): Date {
	const result = new Date(date);
	result.setTime(result.getTime() + amount * 1000);
	return result;
}

// ─── Sub functions (negative wrappers around add) ────────────────

/** Subtract days from a date. @see addDays */
export function subDays(date: Date, amount: number): Date {
	return addDays(date, -amount);
}

/** Subtract months from a date. @see addMonths */
export function subMonths(date: Date, amount: number): Date {
	return addMonths(date, -amount);
}

/** Subtract years from a date. @see addYears */
export function subYears(date: Date, amount: number): Date {
	return addYears(date, -amount);
}

/** Subtract hours from a date. @see addHours */
export function subHours(date: Date, amount: number): Date {
	return addHours(date, -amount);
}

/** Subtract minutes from a date. @see addMinutes */
export function subMinutes(date: Date, amount: number): Date {
	return addMinutes(date, -amount);
}

/** Subtract seconds from a date. @see addSeconds */
export function subSeconds(date: Date, amount: number): Date {
	return addSeconds(date, -amount);
}

// ─── Internal helper ─────────────────────────────────────────────

function isLeapYearHelper(year: number): boolean {
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
