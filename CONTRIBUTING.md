# Contributing to date-light

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Development Setup

```bash
git clone https://github.com/your-org/date-light.git
cd date-light
npm install
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build ESM + CJS + `.d.ts` via tsup |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run bench` | Run benchmarks |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | Lint source files |
| `npm run format` | Auto-format source files |
| `npm run format:check` | Check formatting without writing |
| `npm run check` | Full check (typecheck + lint + format + test) |

## Project Structure

```
src/
  format.ts      — format(date, pattern)
  parse.ts       — parseISO() and parse()
  add.ts         — add/sub functions (addDays, subDays, etc.)
  diff.ts        — differenceIn* functions
  compare.ts     — isBefore, isAfter, isEqual, isSameDay, isSameMonth
  query.ts       — isWeekend, isLeapYear, isValid, getDaysInMonth, getWeekOfYear
  startEnd.ts    — startOf/endOf functions (day, week, month, year)
  index.ts       — re-exports everything
tests/
  format.test.ts
  parse.test.ts
  add.test.ts
  diff.test.ts
  compare.test.ts
  query.test.ts
  startEnd.test.ts
  edge-cases.test.ts
bench/
  index.bench.ts — vitest benchmarks
```

## Design Principles

Before contributing, please understand these core principles — they are non-negotiable:

1. **Zero runtime dependencies** — never add a dependency to `dependencies`
2. **Pure functions only** — every function takes a `Date` and returns a new `Date` (or a primitive). No mutation, no side effects.
3. **Immutability** — never modify the input `Date`. Always return `new Date()`.
4. **Named exports only** — no default export, no class, no chaining API
5. **Bundle size budget** — minzipped must stay under 5 KB. Add with care.
6. **date-fns compatibility** — same pattern syntax (`yyyy-MM-dd`), same function signatures where possible

## How to Add a New Function

1. Add the function to the appropriate module file in `src/` (or create a new one if it's a new category)
2. Add a JSDoc comment with `@param`, `@returns`, and `@example`
3. Export it from `src/index.ts`
4. Add tests in `tests/`
5. Run `npm run check` — everything must pass
6. Run `npm run build` and verify the bundle size hasn't grown unexpectedly

## Testing Guidelines

- Use `vitest` — it's already configured
- Test file naming: `<module>.test.ts` in the `tests/` directory
- Cover: happy path, edge cases, and at least one error case
- Month-end clamping and leap-year handling must be tested explicitly
- Run `npm run test:coverage` — lines/functions should stay above 90%

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Make your changes with tests
3. Ensure `npm run check` passes with no errors
4. Open a PR with a clear description of what changed and why
5. One approval required before merge

## Reporting Bugs

Open an issue with:

- Node.js version
- Minimal reproduction code
- Expected vs actual output
- Which function(s) are affected
