# Synergy Platform Contract Demo

This private demo app contains minimal fixtures for browser and platform behavior contracts that Synergy depends on.

It is intentionally separate from the framework demo apps so React, Angular, Vue, and Vanilla can remain mirrored in functionality. Specs for these fixtures live in `packages/_private/e2e-demo-test/src/PlatformContracts`.

## Usage

```bash
pnpm install
pnpm run _build
pnpm run dev
```

The app runs on port `5177`.
