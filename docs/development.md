# Development

## Setup

```bash
git clone https://github.com/flyingsquirrel0419/date-light.git
cd date-light
npm install
```

## Scripts

```bash
npm run build          # library build: ESM + CJS + .d.ts via tsup
npm test               # vitest run
npm run test:coverage  # coverage report
npm run test:package   # verify CJS and ESM package entrypoints
npm run bench          # vitest bench
npm run typecheck      # tsc --noEmit
npm run lint           # eslint
npm run format:check   # prettier check
npm run check          # full local validation
```

## Docs Site

The docs site is built separately from the package output:

```bash
npm run docs:build
npm run docs:preview
```

Library artifacts are written to `dist/`. Site artifacts are written to `dist-docs/`.

## Release Checks

Before publishing, CI runs:

```bash
npm run check
```

That includes package entrypoint verification so both of these work from the built package:

```typescript
require("date-light");
await import("date-light");
```
