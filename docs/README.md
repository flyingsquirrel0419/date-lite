# date-light docs

date-light is a small TypeScript date utility library for the common operations most apps need: formatting, parsing, date math, comparisons, predicates, and period boundaries.

## Start here

- [Getting Started](getting-started.md) - install, import, and common examples
- [API Reference](api.md) - every exported function and signature
- [Migration from date-fns](migration.md) - what maps cleanly and what is intentionally different
- [Benchmarks](benchmarks.md) - size and speed notes
- [Development](development.md) - local setup and release checks

## Design goals

- Keep the package tiny and dependency-free.
- Use native `Date` directly.
- Return new `Date` objects instead of mutating inputs.
- Match common date-fns-style behavior where date-light exposes a similar function.
- Avoid large features that belong in dedicated libraries, such as locale packs and timezone databases.
