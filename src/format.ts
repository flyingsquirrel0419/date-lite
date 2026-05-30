const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const WEEKDAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAY_NAMES_NARROW = ["S", "M", "T", "W", "T", "F", "S"];

const TOKENS: Record<string, (d: Date) => string> = {
  yyyy: (d) => String(d.getFullYear()).padStart(4, "0"),
  yy: (d) => String(d.getFullYear() % 100).padStart(2, "0"),
  MMMM: (d) => MONTH_NAMES[d.getMonth()],
  MMM: (d) => MONTH_NAMES_SHORT[d.getMonth()],
  MM: (d) => String(d.getMonth() + 1).padStart(2, "0"),
  M: (d) => String(d.getMonth() + 1),
  dd: (d) => String(d.getDate()).padStart(2, "0"),
  d: (d) => String(d.getDate()),
  HH: (d) => String(d.getHours()).padStart(2, "0"),
  H: (d) => String(d.getHours()),
  hh: (d) => String(d.getHours() % 12 || 12).padStart(2, "0"),
  h: (d) => String(d.getHours() % 12 || 12),
  mm: (d) => String(d.getMinutes()).padStart(2, "0"),
  m: (d) => String(d.getMinutes()),
  ss: (d) => String(d.getSeconds()).padStart(2, "0"),
  s: (d) => String(d.getSeconds()),
  SSS: (d) => String(d.getMilliseconds()).padStart(3, "0"),
  a: (d) => (d.getHours() < 12 ? "AM" : "PM"),
  EEEEE: (d) => WEEKDAY_NAMES_NARROW[d.getDay()],
  EEEE: (d) => WEEKDAY_NAMES[d.getDay()],
  EEE: (d) => WEEKDAY_NAMES_SHORT[d.getDay()],
};

// Sort tokens longest-first to avoid partial matches (yyyy before yy)
const SORTED_TOKENS = Object.keys(TOKENS).sort((a, b) => b.length - a.length);

const TOKEN_RE = new RegExp(`(${SORTED_TOKENS.join("|")})`, "g");

/**
 * Format a Date into a string using a pattern.
 *
 * Uses date-fns compatible pattern syntax (not dayjs-style YYYY).
 *
 * Supported tokens: yyyy, yy, MMMM, MMM, MM, M, dd, d, HH, H, hh, h,
 * mm, m, ss, s, SSS, a, EEEEE, EEEE, EEE
 *
 * @param date - The Date object to format
 * @param pattern - Format pattern string using supported tokens
 * @returns Formatted date string
 *
 * @example
 * format(new Date(2026, 0, 15), 'yyyy-MM-dd') // '2026-01-15'
 * format(new Date(2026, 0, 15, 14, 30), 'yyyy-MM-dd HH:mm') // '2026-01-15 14:30'
 * format(new Date(2026, 0, 15), 'EEEE, MMMM d') // 'Thursday, January 15'
 */
export function format(date: Date, pattern: string): string {
  return pattern.replace(TOKEN_RE, (token) => TOKENS[token](date));
}
