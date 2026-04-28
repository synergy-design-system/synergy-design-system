# MCP Token Watermarks

This folder contains MCP-side token watermark checks for AI-facing tool responses.

## Commands

- `pnpm -C packages/mcp test:watermarks`: run report-only measurement against current build
- `pnpm -C packages/mcp test:watermarks:baseline`: generate/update local baseline file
- `pnpm -C packages/mcp test:watermarks:strict`: enforce scenario budgets and baseline regressions

## Baseline strategy

The long-term PREV baseline should come from the latest release tag of `@synergy-design-system/mcp`.
You can generate a local baseline with:

```bash
pnpm -C packages/mcp test:watermarks:baseline
```
