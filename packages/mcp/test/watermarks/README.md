# MCP Token Watermarks

This folder contains MCP-side token watermark checks for AI-facing discovery catalogs, tool responses, and prompts.

## Commands

- `pnpm -C packages/mcp watermark:report`: run report-only measurement against current build
- `pnpm -C packages/mcp watermark:baseline`: generate/update the local baseline file
- `pnpm -C packages/mcp lint:watermark`: enforce scenario budgets and baseline regressions

The `catalog:tools-list` and `catalog:resources-list` scenarios measure discovery metadata that clients may expose to models before any endpoint is called. Individual tool and prompt scenarios measure on-demand working-set costs. Resource contents are not combined into the catalog watermark because clients load them separately.

## Baseline strategy

The long-term PREV baseline should come from the latest release tag of `@synergy-design-system/mcp`.
You can generate a local baseline with:

```bash
pnpm -C packages/mcp test:watermarks:baseline
```
