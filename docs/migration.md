# Migration from date-fns

date-light is not a full date-fns replacement. It is a small date-fns-style surface for common app utilities.

If your code mostly uses formatting, ISO parsing, add/subtract helpers, comparisons, and start/end helpers, migration can be a simple import change.

```diff
- import { format, addDays, differenceInDays } from "date-fns";
+ import { format, addDays, differenceInDays } from "date-light";
```

## Supported Mapping

| date-fns             | date-light           | Status                                    |
| -------------------- | -------------------- | ----------------------------------------- |
| `format`             | `format`             | Same common token style                   |
| `parseISO`           | `parseISO`           | Same date-only local-midnight behavior    |
| `parse`              | `parse`              | Pattern-compatible, no reference date arg |
| `addDays`            | `addDays`            | Same API                                  |
| `addMonths`          | `addMonths`          | Same month-end clamping behavior          |
| `addYears`           | `addYears`           | Same leap-day clamping behavior           |
| `subDays`            | `subDays`            | Same API                                  |
| `subMonths`          | `subMonths`          | Same API                                  |
| `differenceInDays`   | `differenceInDays`   | Calendar-day semantics                    |
| `differenceInHours`  | `differenceInHours`  | Full hours, truncates toward zero         |
| `differenceInMonths` | `differenceInMonths` | Full months, partial months excluded      |
| `differenceInYears`  | `differenceInYears`  | Full years, partial years excluded        |
| `isBefore`           | `isBefore`           | Same API                                  |
| `isAfter`            | `isAfter`            | Same API                                  |
| `isEqual`            | `isEqual`            | Same millisecond comparison               |
| `startOfDay`         | `startOfDay`         | Same API                                  |
| `endOfDay`           | `endOfDay`           | Same API                                  |
| `startOfWeek`        | `startOfWeek`        | ISO week, Monday start                    |
| `endOfWeek`          | `endOfWeek`          | ISO week, Sunday end                      |
| `isWeekend`          | `isWeekend`          | Same API                                  |
| `isLeapYear`         | `isLeapYear`         | Same Gregorian leap-year rules            |
| `getDaysInMonth`     | `getDaysInMonth`     | Same API                                  |
| `isValid`            | `isValid`            | Same `Date` validity check                |

## Not Included

| Feature             | Why not included                     | Alternative                     |
| ------------------- | ------------------------------------ | ------------------------------- |
| Locale / i18n       | Adds significant bundle size         | `Intl.DateTimeFormat`           |
| Timezone conversion | Requires a timezone database         | Temporal, Luxon, or date-fns-tz |
| Interval / duration | Less common for small app bundles    | Compose from existing functions |
| Chaining API        | Wrapper objects add runtime overhead | Function composition            |
| Plugin system       | Over-engineering for a tiny package  | Import individual functions     |

## Token Syntax

date-light uses date-fns-style lowercase year/day tokens:

```typescript
format(date, "yyyy-MM-dd"); // good
format(date, "YYYY-MM-DD"); // dayjs-style tokens are not supported
```
