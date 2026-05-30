<div align="center">

# date-lite

[![CI](https://github.com/flyingsquirrel0419/date-lite/actions/workflows/ci.yml/badge.svg)](https://github.com/flyingsquirrel0419/date-lite/actions/workflows/ci.yml)
[![Test](https://github.com/flyingsquirrel0419/date-lite/actions/workflows/test.yml/badge.svg)](https://github.com/flyingsquirrel0419/date-lite/actions/workflows/test.yml)
[![npm version](https://img.shields.io/npm/v/date-lite.svg)](https://www.npmjs.com/package/date-lite)
[![coverage](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/flyingsquirrel0419/date-lite/main/coverage-badge.json&cacheSeconds=30)](https://github.com/flyingsquirrel0419/date-lite/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6.svg)](https://www.typescriptlang.org/)

**The 20 date-fns functions you actually use — in 1.75 KB.**

Zero dependencies. Full TypeScript types. Pure functions. date-fns compatible API.

[Quick Start](#quick-start) · [API Reference](#api-reference) · [Benchmarks](#benchmarks) · [Migration](#migration-from-date-fns)

</div>

---

## Features

- **~1.75 KB minzipped** — 10x smaller than the same 20 functions from date-fns, 1.7x smaller than dayjs
- **Zero dependencies** — no supply chain risk, no bloated `node_modules`
- **Full TypeScript** — strict mode, complete type definitions, zero `any`
- **date-fns compatible** — drop-in replacement for the functions you use most; same pattern syntax (`yyyy-MM-dd`)
- **Blazing fast** — up to 17x faster than dayjs, up to 10x faster than date-fns on common operations
- **Pure & immutable** — every function returns a new `Date`, never mutates the input
- **Tree-shakeable** — `sideEffects: false`, named exports only, import what you need

---

## Quick Start

```bash
npm install date-lite
```

```typescript
import { format, addDays, differenceInDays, isBefore, startOfDay } from "date-lite";

const today = new Date();

format(today, "yyyy-MM-dd"); // '2026-05-30'
format(today, "yyyy-MM-dd HH:mm:ss"); // '2026-05-30 14:30:45'
format(today, "EEEE, MMM d"); // 'Friday, May 30'

addDays(today, 7); // a week from now
differenceInDays(addDays(today, 7), today); // 7
isBefore(today, addDays(today, 1)); // true
startOfDay(today); // 00:00:00.000
```

---

## Installation

### Requirements

- Node.js 18+ or modern browsers (ES2020)
- TypeScript 5.0+ (optional, for type support)

### npm

```bash
npm install date-lite
```

### yarn / pnpm / bun

```bash
yarn add date-lite
pnpm add date-lite
bun add date-lite
```

### From source

```bash
git clone https://github.com/your-org/date-lite.git
cd date-lite
npm install
npm run build
```

---

## Usage

### Format dates

```typescript
import { format } from "date-lite";

const date = new Date(2026, 0, 15, 14, 30, 45, 123);

format(date, "yyyy-MM-dd"); // '2026-01-15'
format(date, "yyyy-MM-dd HH:mm:ss"); // '2026-01-15 14:30:45'
format(date, "yyyy-MM-dd HH:mm:ss.SSS"); // '2026-01-15 14:30:45.123'
format(date, "MM/dd/yyyy"); // '01/15/2026'
format(date, "M/d/yy"); // '1/15/26'
format(date, "hh:mm a"); // '02:30 PM'
format(date, "EEEE, MMMM d"); // 'Thursday, January 15'
```

#### Format tokens

| Token  | Output                   | Example     |
| ------ | ------------------------ | ----------- |
| `yyyy` | 4-digit year             | `2026`      |
| `yy`   | 2-digit year             | `26`        |
| `MM`   | Zero-padded month        | `01`-`12`   |
| `M`    | Month                    | `1`-`12`    |
| `dd`   | Zero-padded day          | `01`-`31`   |
| `d`    | Day                      | `1`-`31`    |
| `HH`   | Zero-padded hours (24h)  | `00`-`23`   |
| `H`    | Hours (24h)              | `0`-`23`    |
| `hh`   | Zero-padded hours (12h)  | `01`-`12`   |
| `h`    | Hours (12h)              | `1`-`12`    |
| `mm`   | Zero-padded minutes      | `00`-`59`   |
| `m`    | Minutes                  | `0`-`59`    |
| `ss`   | Zero-padded seconds      | `00`-`59`   |
| `s`    | Seconds                  | `0`-`59`    |
| `SSS`  | Zero-padded milliseconds | `000`-`999` |
| `a`    | AM / PM                  | `AM` / `PM` |
| `EEEE` | Full weekday name        | `Monday`    |
| `EEE`  | Short weekday name       | `Mon`       |

> Pattern syntax is **date-fns compatible** (`yyyy-MM-dd`), not dayjs style (`YYYY-MM-DD`).

### Parse dates

```typescript
import { parseISO, parse } from "date-lite";

parseISO("2026-01-15"); // Date (midnight local time)
parseISO("2026-01-15T10:30:00"); // Date (local time)
parseISO("2026-01-15T10:30:00Z"); // Date (UTC)

parse("2026-01-15", "yyyy-MM-dd"); // Date
parse("15/01/2026", "dd/MM/yyyy"); // Date
parse("2026-01-15 14:30", "yyyy-MM-dd HH:mm"); // Date
```

### Add & subtract

```typescript
import { addDays, addMonths, addYears, addHours, subDays, subMonths } from "date-lite";

const date = new Date(2026, 0, 15);

addDays(date, 7); // Jan 22
addMonths(date, 1); // Feb 15
addYears(date, 1); // Jan 15, 2027
addHours(date, 3); // same day, +3h

subDays(date, 7); // Jan 8
subMonths(date, 1); // Dec 15, 2025
```

#### Month-end clamping

When the target month has fewer days, the day is clamped to the last day of that month — just like date-fns:

```typescript
addMonths(new Date(2026, 0, 31), 1); // Feb 28, 2026 (clamped)
addMonths(new Date(2024, 0, 31), 1); // Feb 29, 2024 (leap year - no clamp)
addYears(new Date(2024, 1, 29), 1); // Feb 28, 2025 (leap to non-leap)
```

### Calculate differences

```typescript
import { differenceInDays, differenceInHours, differenceInMonths } from "date-lite";

const a = new Date(2026, 5, 30);
const b = new Date(2026, 0, 1);

differenceInDays(a, b); // 180
differenceInMonths(a, b); // 5
differenceInHours(a, b); // 4320
```

Positive when `dateLeft > dateRight`, negative otherwise.

### Compare dates

```typescript
import { isBefore, isAfter, isEqual, isSameDay, isSameMonth } from "date-lite";

isBefore(new Date(2026, 0, 1), new Date(2026, 0, 2)); // true
isAfter(new Date(2026, 0, 2), new Date(2026, 0, 1)); // true
isEqual(dateLeft, dateRight); // same millisecond?
isSameDay(dateA, dateB); // same calendar day?
isSameMonth(dateA, dateB); // same year + month?
```

### Query dates

```typescript
import { isWeekend, isLeapYear, isValid, getDaysInMonth, getWeekOfYear } from "date-lite";

isWeekend(new Date(2026, 5, 27)); // true (Saturday)
isLeapYear(new Date(2024, 0, 1)); // true
isLeapYear(new Date(1900, 0, 1)); // false (century, not divisible by 400)
isValid(new Date("invalid")); // false
getDaysInMonth(new Date(2024, 1, 1)); // 29 (leap year February)
getWeekOfYear(new Date(2026, 0, 1)); // 1 (ISO 8601 week number)
```

### Start / end of periods

```typescript
import { startOfDay, endOfDay, startOfMonth, endOfMonth, startOfWeek } from "date-lite";

const date = new Date(2026, 5, 30, 14, 30, 45);

startOfDay(date); // Mon Jun 30 2026 00:00:00.000
endOfDay(date); // Mon Jun 30 2026 23:59:59.999
startOfWeek(date); // Mon Jun 29 2026 00:00:00.000 (ISO 8601 - Monday)
endOfWeek(date); // Sun Jul 05 2026 23:59:59.999
startOfMonth(date); // Mon Jun 01 2026 00:00:00.000
endOfMonth(date); // Tue Jun 30 2026 23:59:59.999
startOfYear(date); // Thu Jan 01 2026 00:00:00.000
endOfYear(date); // Thu Dec 31 2026 23:59:59.999
```

---

## API Reference

### Format & Parse

| Function   | Signature                                    | Description                               |
| ---------- | -------------------------------------------- | ----------------------------------------- |
| `format`   | `(date: Date, pattern: string) => string`    | Format a date using pattern tokens        |
| `parseISO` | `(dateStr: string) => Date`                  | Parse an ISO 8601 date string             |
| `parse`    | `(dateStr: string, pattern: string) => Date` | Parse a date string with a custom pattern |

### Add & Subtract

| Function     | Signature                              | Description                       |
| ------------ | -------------------------------------- | --------------------------------- |
| `addDays`    | `(date: Date, amount: number) => Date` | Add calendar days                 |
| `addMonths`  | `(date: Date, amount: number) => Date` | Add months (clamps day if needed) |
| `addYears`   | `(date: Date, amount: number) => Date` | Add years                         |
| `addHours`   | `(date: Date, amount: number) => Date` | Add hours                         |
| `addMinutes` | `(date: Date, amount: number) => Date` | Add minutes                       |
| `addSeconds` | `(date: Date, amount: number) => Date` | Add seconds                       |
| `subDays`    | `(date: Date, amount: number) => Date` | Subtract calendar days            |
| `subMonths`  | `(date: Date, amount: number) => Date` | Subtract months                   |
| `subYears`   | `(date: Date, amount: number) => Date` | Subtract years                    |
| `subHours`   | `(date: Date, amount: number) => Date` | Subtract hours                    |
| `subMinutes` | `(date: Date, amount: number) => Date` | Subtract minutes                  |
| `subSeconds` | `(date: Date, amount: number) => Date` | Subtract seconds                  |

### Difference

| Function              | Signature                                     | Description                      |
| --------------------- | --------------------------------------------- | -------------------------------- |
| `differenceInDays`    | `(dateLeft: Date, dateRight: Date) => number` | Full calendar days between dates |
| `differenceInHours`   | `(dateLeft: Date, dateRight: Date) => number` | Full hours between dates         |
| `differenceInMinutes` | `(dateLeft: Date, dateRight: Date) => number` | Full minutes between dates       |
| `differenceInSeconds` | `(dateLeft: Date, dateRight: Date) => number` | Full seconds between dates       |
| `differenceInMonths`  | `(dateLeft: Date, dateRight: Date) => number` | Calendar months between dates    |
| `differenceInYears`   | `(dateLeft: Date, dateRight: Date) => number` | Calendar years between dates     |

### Compare

| Function      | Signature                                      | Description                           |
| ------------- | ---------------------------------------------- | ------------------------------------- |
| `isBefore`    | `(dateLeft: Date, dateRight: Date) => boolean` | Is left chronologically before right? |
| `isAfter`     | `(dateLeft: Date, dateRight: Date) => boolean` | Is left chronologically after right?  |
| `isEqual`     | `(dateLeft: Date, dateRight: Date) => boolean` | Same millisecond?                     |
| `isSameDay`   | `(dateLeft: Date, dateRight: Date) => boolean` | Same calendar day?                    |
| `isSameMonth` | `(dateLeft: Date, dateRight: Date) => boolean` | Same year and month?                  |

### Query

| Function         | Signature                 | Description                           |
| ---------------- | ------------------------- | ------------------------------------- |
| `isWeekend`      | `(date: Date) => boolean` | Saturday or Sunday?                   |
| `isLeapYear`     | `(date: Date) => boolean` | Is the year a leap year?              |
| `isValid`        | `(date: Date) => boolean` | Is the Date object valid (not `NaN`)? |
| `getDaysInMonth` | `(date: Date) => number`  | Number of days in the month           |
| `getWeekOfYear`  | `(date: Date) => number`  | ISO 8601 week number (1-53)           |

### Start / End

| Function       | Signature              | Description                      |
| -------------- | ---------------------- | -------------------------------- |
| `startOfDay`   | `(date: Date) => Date` | `00:00:00.000`                   |
| `endOfDay`     | `(date: Date) => Date` | `23:59:59.999`                   |
| `startOfWeek`  | `(date: Date) => Date` | Monday `00:00:00.000` (ISO 8601) |
| `endOfWeek`    | `(date: Date) => Date` | Sunday `23:59:59.999` (ISO 8601) |
| `startOfMonth` | `(date: Date) => Date` | 1st of month `00:00:00.000`      |
| `endOfMonth`   | `(date: Date) => Date` | Last day `23:59:59.999`          |
| `startOfYear`  | `(date: Date) => Date` | Jan 1 `00:00:00.000`             |
| `endOfYear`    | `(date: Date) => Date` | Dec 31 `23:59:59.999`            |

---

## Benchmarks

Performance on Node.js 24 — **ops/sec** (higher = faster), best of 3 x 5M iterations.

### vs date-fns v4

| Function           | date-lite   | date-fns   | Ratio     |
| ------------------ | ----------- | ---------- | --------- |
| `format`           | 1,480,248   | 673,310    | **2.2x**  |
| `parseISO`         | 8,237,323   | 802,852    | **10.3x** |
| `addDays`          | 12,649,074  | 12,422,293 | ~same     |
| `addMonths`        | 7,825,218   | 6,665,298  | **1.2x**  |
| `differenceInDays` | 9,037,117   | 1,043,682  | **8.7x**  |
| `isBefore`         | 22,714,335  | 6,910,797  | **3.3x**  |
| `startOfDay`       | 20,175,145  | 20,557,415 | ~same     |
| `isWeekend`        | 225,890,840 | 24,086,930 | **9.4x**  |
| `isLeapYear`       | 222,980,803 | 23,406,377 | **9.5x**  |
| `getDaysInMonth`   | 15,797,587  | 5,891,619  | **2.7x**  |

### vs dayjs v1

| Function           | date-lite  | dayjs     | Ratio     |
| ------------------ | ---------- | --------- | --------- |
| `format`           | 1,480,248  | 791,111   | **1.9x**  |
| `addDays`          | 12,649,074 | 1,445,087 | **8.7x**  |
| `addMonths`        | 7,825,218  | 467,717   | **16.7x** |
| `differenceInDays` | 9,037,117  | 3,462,393 | **2.6x**  |
| `isBefore`         | 22,714,335 | 2,009,216 | **11.3x** |
| `startOfDay`       | 20,175,145 | 2,586,627 | **7.8x**  |

> **Why so fast?** date-lite calls native `Date` methods directly — no wrapper objects (dayjs), no shared internal modules (date-fns). Pure functions with zero overhead.

### Bundle size

| Library                 | minzipped   | Note                               |
| ----------------------- | ----------- | ---------------------------------- |
| **date-lite**           | **1.75 KB** | 39 functions, fully tree-shakeable |
| dayjs                   | 2.97 KB     | Core only (plugins add more)       |
| date-fns (20 functions) | 18.34 KB    | Just the 20 most-used functions    |
| date-fns (full)         | 261.3 KB    | All 252 functions                  |

> date-lite is **10.5x smaller** than the same 20 date-fns functions and **1.7x smaller** than dayjs core.

---

## Migration from date-fns

date-lite uses the same pattern syntax as date-fns (`yyyy-MM-dd`), so most code works with a simple import change:

```diff
- import { format, addDays, differenceInDays } from 'date-fns';
+ import { format, addDays, differenceInDays } from 'date-lite';
```

### Function mapping

All 20 most-used date-fns functions are supported:

| date-fns            | date-lite           | Status   |
| ------------------- | ------------------- | -------- |
| `format`            | `format`            | Same API |
| `parseISO`          | `parseISO`          | Same API |
| `addDays`           | `addDays`           | Same API |
| `addMonths`         | `addMonths`         | Same API |
| `subDays`           | `subDays`           | Same API |
| `differenceInDays`  | `differenceInDays`  | Same API |
| `differenceInHours` | `differenceInHours` | Same API |
| `isBefore`          | `isBefore`          | Same API |
| `isAfter`           | `isAfter`           | Same API |
| `isEqual`           | `isEqual`           | Same API |
| `startOfDay`        | `startOfDay`        | Same API |
| `endOfDay`          | `endOfDay`          | Same API |
| `startOfMonth`      | `startOfMonth`      | Same API |
| `endOfMonth`        | `endOfMonth`        | Same API |
| `startOfWeek`       | `startOfWeek`       | Same API |
| `isWeekend`         | `isWeekend`         | Same API |
| `isLeapYear`        | `isLeapYear`        | Same API |
| `getDaysInMonth`    | `getDaysInMonth`    | Same API |
| `isValid`           | `isValid`           | Same API |

### Not supported (by design)

| Feature             | Why not included                      | Alternative                     |
| ------------------- | ------------------------------------- | ------------------------------- |
| Locale / i18n       | Adds significant bundle size          | `Intl.DateTimeFormat`           |
| Timezone conversion | Requires full TZ database             | `Temporal` API or `luxon`       |
| Interval / Duration | Niche use case                        | Compose from existing functions |
| Chaining API        | Mutable patterns, hidden side effects | Function composition            |
| Plugin system       | Over-engineering for 1.75 KB          | Import individual functions     |

---

## Development

### Setup

```bash
git clone https://github.com/your-org/date-lite.git
cd date-lite
npm install
```

### Build

```bash
npm run build          # ESM + CJS + .d.ts via tsup
```

### Test

```bash
npm test               # vitest run
npm run test:coverage  # with coverage report
npm run test:watch     # watch mode
```

### Benchmarks

```bash
npm run bench           # vitest bench
```

### Lint & type check

```bash
npm run typecheck       # tsc --noEmit
npm run lint            # eslint
npm run format:check    # prettier
```

### Full check

```bash
npm run check           # typecheck + lint + format + test
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Add tests for your changes
4. Ensure `npm run check` passes
5. Open a pull request

---

## License

[MIT](LICENSE) 2026

---

[Security Policy](SECURITY.md) · [Changelog](CHANGELOG.md) · [Code of Conduct](CODE_OF_CONDUCT.md) · [Contributing](CONTRIBUTING.md)
