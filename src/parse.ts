/**
 * Parse an ISO 8601 date string into a Date object.
 *
 * Date-only strings (e.g. `'2026-06-30'`) are parsed as local midnight,
 * matching date-fns behavior. Strings with time components (e.g.
 * `'2026-06-30T10:30:00'`) use the timezone offset as specified.
 *
 * @param dateStr - ISO 8601 formatted date string
 * @returns Parsed Date object
 * @throws {RangeError} If the string is not a valid ISO date
 *
 * @example
 * parseISO('2026-01-15')           // Jan 15 2026 00:00:00 local
 * parseISO('2026-01-15T10:30:00')   // Jan 15 2026 10:30:00 local
 * parseISO('2026-01-15T10:30:00Z')  // Jan 15 2026 10:30:00 UTC
 */
export function parseISO(dateStr: string): Date {
  // Validate basic ISO format
  if (!/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    throw new RangeError(`Invalid ISO date string: ${dateStr}`);
  }

  // date-only strings: parse as local midnight (date-fns compatible)
  // ECMAScript spec parses date-only ISO as UTC, but date-fns intentionally
  // interprets them as local time for usability.
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    if (isNaN(date.getTime())) {
      throw new RangeError(`Invalid ISO date string: ${dateStr}`);
    }
    return date;
  }

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new RangeError(`Invalid ISO date string: ${dateStr}`);
  }

  return date;
}

const PARSE_TOKEN_PATTERNS: Record<string, (s: string) => number> = {
  yyyy: (s) => parseInt(s, 10),
  MM: (s) => parseInt(s, 10),
  dd: (s) => parseInt(s, 10),
  HH: (s) => parseInt(s, 10),
  mm: (s) => parseInt(s, 10),
  ss: (s) => parseInt(s, 10),
  SSS: (s) => parseInt(s, 10),
};

const PARSE_TOKENS_SORTED = Object.keys(PARSE_TOKEN_PATTERNS).sort((a, b) => b.length - a.length);
const PARSE_TOKEN_RE = new RegExp(`(${PARSE_TOKENS_SORTED.join("|")})`, "g");

/**
 * Parse a date string according to a pattern.
 *
 * Supported tokens: yyyy, MM, dd, HH, mm, ss, SSS
 * All other characters in the pattern must match literally.
 *
 * @param dateStr - Date string to parse
 * @param pattern - Pattern matching the input format
 * @returns Parsed Date object
 * @throws {RangeError} If the string does not match the pattern
 *
 * @example
 * parse('2026-01-15', 'yyyy-MM-dd')  // Jan 15 2026
 * parse('15/01/2026', 'dd/MM/yyyy')  // Jan 15 2026
 */
export function parse(dateStr: string, pattern: string): Date {
  const values: Record<string, number> = {};
  let tokenMatch: RegExpExecArray | null;
  PARSE_TOKEN_RE.lastIndex = 0;

  // Build a structured representation of the pattern
  const segments: Array<{ type: "token"; token: string } | { type: "literal"; char: string }> = [];

  let lastIndex = 0;
  while ((tokenMatch = PARSE_TOKEN_RE.exec(pattern)) !== null) {
    if (tokenMatch.index > lastIndex) {
      for (const ch of pattern.slice(lastIndex, tokenMatch.index)) {
        segments.push({ type: "literal", char: ch });
      }
    }
    segments.push({ type: "token", token: tokenMatch[1] });
    lastIndex = tokenMatch.index + tokenMatch[0].length;
  }
  if (lastIndex < pattern.length) {
    for (const ch of pattern.slice(lastIndex)) {
      segments.push({ type: "literal", char: ch });
    }
  }

  // Walk segments and extract values
  let si = 0;
  for (const seg of segments) {
    if (seg.type === "literal") {
      if (dateStr[si] !== seg.char) {
        throw new RangeError(
          `Mismatch at position ${si}: expected '${seg.char}', got '${dateStr[si]}'`,
        );
      }
      si++;
    } else {
      const len = seg.token.length;
      const valueStr = dateStr.slice(si, si + len);
      if (valueStr.length !== len) {
        throw new RangeError(`Unexpected end of input at position ${si}`);
      }
      values[seg.token] = PARSE_TOKEN_PATTERNS[seg.token](valueStr);
      si += len;
    }
  }

  const year = values["yyyy"] ?? 1970;
  const month = (values["MM"] ?? 1) - 1;
  const day = values["dd"] ?? 1;
  const hours = values["HH"] ?? 0;
  const minutes = values["mm"] ?? 0;
  const seconds = values["ss"] ?? 0;
  const ms = values["SSS"] ?? 0;

  return new Date(year, month, day, hours, minutes, seconds, ms);
}
