# API Reference

## Format and Parse

| Function   | Signature                                    | Description                               |
| ---------- | -------------------------------------------- | ----------------------------------------- |
| `format`   | `(date: Date, pattern: string) => string`    | Format a date using pattern tokens        |
| `parseISO` | `(dateStr: string) => Date`                  | Parse an ISO 8601 date string             |
| `parse`    | `(dateStr: string, pattern: string) => Date` | Parse a date string with a custom pattern |

### Format Tokens

| Token  | Output                   | Example     |
| ------ | ------------------------ | ----------- |
| `yyyy` | 4-digit year             | `2026`      |
| `yy`   | 2-digit year             | `26`        |
| `MMMM` | Full month name          | `January`   |
| `MMM`  | Short month name         | `Jan`       |
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

## Add and Subtract

| Function     | Signature                              | Description                    |
| ------------ | -------------------------------------- | ------------------------------ |
| `addDays`    | `(date: Date, amount: number) => Date` | Add calendar days              |
| `addMonths`  | `(date: Date, amount: number) => Date` | Add months, clamping if needed |
| `addYears`   | `(date: Date, amount: number) => Date` | Add years                      |
| `addHours`   | `(date: Date, amount: number) => Date` | Add hours                      |
| `addMinutes` | `(date: Date, amount: number) => Date` | Add minutes                    |
| `addSeconds` | `(date: Date, amount: number) => Date` | Add seconds                    |
| `subDays`    | `(date: Date, amount: number) => Date` | Subtract calendar days         |
| `subMonths`  | `(date: Date, amount: number) => Date` | Subtract months                |
| `subYears`   | `(date: Date, amount: number) => Date` | Subtract years                 |
| `subHours`   | `(date: Date, amount: number) => Date` | Subtract hours                 |
| `subMinutes` | `(date: Date, amount: number) => Date` | Subtract minutes               |
| `subSeconds` | `(date: Date, amount: number) => Date` | Subtract seconds               |

## Difference

| Function              | Signature                                     | Description                         |
| --------------------- | --------------------------------------------- | ----------------------------------- |
| `differenceInDays`    | `(dateLeft: Date, dateRight: Date) => number` | Full calendar days between dates    |
| `differenceInHours`   | `(dateLeft: Date, dateRight: Date) => number` | Full hours between dates            |
| `differenceInMinutes` | `(dateLeft: Date, dateRight: Date) => number` | Full minutes between dates          |
| `differenceInSeconds` | `(dateLeft: Date, dateRight: Date) => number` | Full seconds between dates          |
| `differenceInMonths`  | `(dateLeft: Date, dateRight: Date) => number` | Full months, excluding partial ones |
| `differenceInYears`   | `(dateLeft: Date, dateRight: Date) => number` | Full years, excluding partial ones  |

Positive results mean `dateLeft > dateRight`; negative results mean `dateLeft < dateRight`.

## Compare

| Function      | Signature                                      | Description                           |
| ------------- | ---------------------------------------------- | ------------------------------------- |
| `isBefore`    | `(dateLeft: Date, dateRight: Date) => boolean` | Is left chronologically before right? |
| `isAfter`     | `(dateLeft: Date, dateRight: Date) => boolean` | Is left chronologically after right?  |
| `isEqual`     | `(dateLeft: Date, dateRight: Date) => boolean` | Same millisecond?                     |
| `isSameDay`   | `(dateLeft: Date, dateRight: Date) => boolean` | Same calendar day?                    |
| `isSameMonth` | `(dateLeft: Date, dateRight: Date) => boolean` | Same year and month?                  |

## Query

| Function         | Signature                 | Description                           |
| ---------------- | ------------------------- | ------------------------------------- |
| `isWeekend`      | `(date: Date) => boolean` | Saturday or Sunday?                   |
| `isLeapYear`     | `(date: Date) => boolean` | Is the year a leap year?              |
| `isValid`        | `(date: Date) => boolean` | Is the Date object valid (not `NaN`)? |
| `getDaysInMonth` | `(date: Date) => number`  | Number of days in the month           |
| `getWeekOfYear`  | `(date: Date) => number`  | ISO 8601 week number, 1-53            |

## Start and End

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
