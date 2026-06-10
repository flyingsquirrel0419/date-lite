import { startOfDay } from "./startEnd";

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60000;
const MS_PER_HOUR = 3600000;
const MS_PER_DAY = 86400000;

function compareAsc(dateLeft: Date, dateRight: Date): number {
  const diff = dateLeft.getTime() - dateRight.getTime();
  if (diff < 0) return -1;
  if (diff > 0) return 1;
  return diff;
}

function isLastDayOfMonth(date: Date): boolean {
  return date.getDate() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

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
  return Math.trunc((dateLeft.getTime() - dateRight.getTime()) / MS_PER_HOUR);
}

/**
 * Get the number of full minutes between two dates.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @returns Number of full minutes (positive if dateLeft > dateRight)
 */
export function differenceInMinutes(dateLeft: Date, dateRight: Date): number {
  return Math.trunc((dateLeft.getTime() - dateRight.getTime()) / MS_PER_MINUTE);
}

/**
 * Get the number of full seconds between two dates.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @returns Number of full seconds (positive if dateLeft > dateRight)
 */
export function differenceInSeconds(dateLeft: Date, dateRight: Date): number {
  return Math.trunc((dateLeft.getTime() - dateRight.getTime()) / MS_PER_SECOND);
}

/**
 * Get the number of full months between two dates.
 *
 * Accounts for day-of-month, so partial months are not counted.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @returns Number of full months (positive if dateLeft > dateRight)
 *
 * @example
 * differenceInMonths(new Date(2026, 5, 15), new Date(2026, 0, 15)) // 5
 */
export function differenceInMonths(dateLeft: Date, dateRight: Date): number {
  const left = new Date(dateLeft);
  const workingLeft = new Date(dateLeft);
  const right = new Date(dateRight);

  const sign = compareAsc(workingLeft, right);
  const difference = Math.abs(
    (workingLeft.getFullYear() - right.getFullYear()) * 12 +
      (workingLeft.getMonth() - right.getMonth()),
  );

  if (difference < 1) return 0;

  if (workingLeft.getMonth() === 1 && workingLeft.getDate() > 27) {
    workingLeft.setDate(30);
  }

  workingLeft.setMonth(workingLeft.getMonth() - sign * difference);

  let isLastMonthNotFull = compareAsc(workingLeft, right) === -sign;

  if (isLastDayOfMonth(left) && difference === 1 && compareAsc(left, right) === 1) {
    isLastMonthNotFull = false;
  }

  const result = sign * (difference - Number(isLastMonthNotFull));
  return result === 0 ? 0 : result;
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
  const left = new Date(dateLeft);
  const right = new Date(dateRight);

  const sign = compareAsc(left, right);
  const difference = Math.abs(left.getFullYear() - right.getFullYear());

  left.setFullYear(1584);
  right.setFullYear(1584);

  const isLastYearNotFull = compareAsc(left, right) === -sign;
  const result = sign * (difference - Number(isLastYearNotFull));
  return result === 0 ? 0 : result;
}
