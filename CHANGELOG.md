# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-05-30

### Added

- `format(date, pattern)` — 18 pattern tokens, date-fns compatible syntax
- `parseISO(dateStr)` — ISO 8601 date string parser
- `parse(dateStr, pattern)` — custom pattern date parser
- `addDays`, `addMonths`, `addYears`, `addHours`, `addMinutes`, `addSeconds`
- `subDays`, `subMonths`, `subYears`, `subHours`, `subMinutes`, `subSeconds`
- `differenceInDays`, `differenceInHours`, `differenceInMinutes`, `differenceInSeconds`, `differenceInMonths`, `differenceInYears`
- `isBefore`, `isAfter`, `isEqual`, `isSameDay`, `isSameMonth`
- `isWeekend`, `isLeapYear`, `isValid`, `getDaysInMonth`, `getWeekOfYear`
- `startOfDay`, `endOfDay`, `startOfWeek`, `endOfWeek`, `startOfMonth`, `endOfMonth`, `startOfYear`, `endOfYear`
- Full TypeScript type definitions (strict mode)
- ESM + CJS dual build via tsup
- 100 unit tests with 97%+ line coverage
- Vitest benchmarks vs date-fns and dayjs
- Zero runtime dependencies

[0.1.0]: https://github.com/your-org/date-lite/releases/tag/v0.1.0
