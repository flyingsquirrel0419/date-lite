# Getting Started

## Installation

```bash
npm install date-light
```

```bash
yarn add date-light
pnpm add date-light
bun add date-light
```

## Requirements

- Node.js 18+ or modern browsers
- TypeScript 5.0+ for type support

## Quick Example

```typescript
import { addDays, differenceInDays, format, startOfDay } from "date-light";

const today = new Date(2026, 4, 30, 14, 30, 45);
const nextWeek = addDays(today, 7);

format(today, "yyyy-MM-dd"); // "2026-05-30"
format(today, "yyyy-MM-dd HH:mm:ss"); // "2026-05-30 14:30:45"
differenceInDays(nextWeek, today); // 7
startOfDay(today); // 00:00:00.000
```

## Format Dates

```typescript
import { format } from "date-light";

const date = new Date(2026, 0, 15, 14, 30, 45, 123);

format(date, "yyyy-MM-dd"); // "2026-01-15"
format(date, "yyyy-MM-dd HH:mm:ss"); // "2026-01-15 14:30:45"
format(date, "yyyy-MM-dd HH:mm:ss.SSS"); // "2026-01-15 14:30:45.123"
format(date, "MM/dd/yyyy"); // "01/15/2026"
format(date, "hh:mm a"); // "02:30 PM"
format(date, "EEEE, MMMM d"); // "Thursday, January 15"
```

Pattern syntax follows the common date-fns style: `yyyy-MM-dd`, not dayjs-style `YYYY-MM-DD`.

## Parse Dates

```typescript
import { parse, parseISO } from "date-light";

parseISO("2026-01-15"); // local midnight
parseISO("2026-01-15T10:30:00"); // local time
parseISO("2026-01-15T10:30:00Z"); // UTC

parse("2026-01-15", "yyyy-MM-dd");
parse("15/01/2026", "dd/MM/yyyy");
parse("2026-01-15 14:30", "yyyy-MM-dd HH:mm");
```

## Add and Subtract

```typescript
import { addDays, addMonths, addYears, subDays, subMonths } from "date-light";

const date = new Date(2026, 0, 15);

addDays(date, 7); // Jan 22
addMonths(date, 1); // Feb 15
addYears(date, 1); // Jan 15, 2027

subDays(date, 7); // Jan 8
subMonths(date, 1); // Dec 15, 2025
```

Month and year math clamps impossible calendar dates:

```typescript
addMonths(new Date(2026, 0, 31), 1); // Feb 28, 2026
addMonths(new Date(2024, 0, 31), 1); // Feb 29, 2024
addYears(new Date(2024, 1, 29), 1); // Feb 28, 2025
```

## Compare and Query

```typescript
import { isAfter, isBefore, isLeapYear, isSameDay, isWeekend } from "date-light";

isBefore(new Date(2026, 0, 1), new Date(2026, 0, 2)); // true
isAfter(new Date(2026, 0, 2), new Date(2026, 0, 1)); // true
isSameDay(new Date(2026, 0, 15, 0), new Date(2026, 0, 15, 23)); // true
isWeekend(new Date(2026, 5, 27)); // true
isLeapYear(new Date(2024, 0, 1)); // true
```

## Start and End Helpers

```typescript
import { endOfMonth, startOfDay, startOfMonth, startOfWeek } from "date-light";

const date = new Date(2026, 5, 30, 14, 30, 45);

startOfDay(date); // Tue Jun 30 2026 00:00:00.000
startOfWeek(date); // Mon Jun 29 2026 00:00:00.000
startOfMonth(date); // Mon Jun 01 2026 00:00:00.000
endOfMonth(date); // Tue Jun 30 2026 23:59:59.999
```
