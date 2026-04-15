# Metadata Package — State Report (April 2026)

> Generated April 2026. Based on `packages/metadata` at branch `major/1241-metadata-package`.

---

## What Is Good ✅

### FINDINGS.md — All Issues Resolved (7/7)

| Issue | Resolution |
|---|---|
| Lack of documentation | JSDoc added to all public API functions |
| Duplicated `sortEntityById` | Centralized as `sortByEntityId<T>()` in `src/public/utils.ts` |
| Generic `MetadataEntity` types | `MetadataEntity<TCustom>` is now generic with per-entity type aliases (`AssetEntity`, `ComponentEntity`, etc.) |
| Layer content retrieval | `readLayerFilesForEntity()` + `LayerFileContent` returns actual string content, not just paths |
| Component list boilerplate | `listComponents()` handles sorting, filtering, and pagination |
| `searchIcons` single `assetId` | `assetId?: string \| string[]` — array accepted, parallel lookups run with `Promise.all` |
| `category`/`tags` exclusive filter | `filterMode?: 'and' \| 'or'` added to `IconSearchQuery` — correctly handles null-group semantics |

### CONFIG_SYSTEM.md — Mostly Done (4/5)

| Item | Status |
|---|---|
| `_docs.json` moved to `external-data/storybook/` | ✅ File exists and is populated |
| Config loader wired into build pipeline | ✅ `loadConfig()` called early in `build.ts` |
| Enriched data used in layer writers | ✅ Figma links + custom markdown sections injected in `write-layers.ts` |
| Tests for loader and enrichment logic | ✅ `config-and-json-determinism.test.mjs` covers `loadConfig`, `getOverride`, `getClustersForEntity` |
| Public API helpers (`getComponentOverride`, `getClustersForEntity`) | ❌ See gaps below |

### Architecture & Collectors

- All 5 domain collectors are complete: `components`, `tokens`, `styles`, `fonts`, `assets`
- All 3 framework enrichers are complete: `vue`, `react`, `angular`
- All setup entities emitted:
  - `setup:components-package`, `setup:synergy-migrations`
  - `setup:vue-package`, `setup:react-package`
  - `setup:angular-package`, `setup:angular-*-module`
  - `setup:tokens-package`, `setup:styles-package`, `setup:fonts-package`, `setup:assets-package`
- Storybook facade refactor is complete: `source/` subfolder isolates the Playwright implementation; the facade exposes a `collect → normalize → write` pipeline; the scraper never writes files directly
- Storybook write step correctly prunes stale example files on successful full scrapes, keeping core layer refs in sync

### MCP Migration

All 14 MCP tools have been migrated to the new public API:

| Tools | Public API Used |
|---|---|
| `component-list`, `component-info` | `listComponents()`, `getDataForComponent()` |
| `asset-list`, `asset-info` | `listAssets()`, `searchIcons()` |
| `styles-list`, `styles-info` | `listStyles()`, `getDataForStyle()` |
| `token-info`, `tokens-list` | `getDataForTokens()` |
| `template-info`, `template-list` | `getDataForTemplate()`, `listTemplates()` |
| `setup` | `getDataForSetup()` |
| `migration-list`, `migration-info` | `createMetadataStore()` (via MCP utility) |
| `davinci-migration-list`, `davinci-migration-info` | `getDataForSetup()` (via MCP utility) |

### Test Coverage

6 integration tests pass: `build-success`, `public-api`, `config-and-json-determinism`, `schema-linting`, `components-preflight`, `storybook-sync-pruning`. The `storybook-source-configs.test.mjs` additionally covers source config behavior.

---

## What Is Still Lacking ❌

### 1. ADR Summary Fields Deferred From v1.0.0

`shortDescription`, `llmHint`, and `usageHints` were specified in the ADR as future AI-optimized summary fields, but they are intentionally **deferred from `1.0.0`** and are not part of the current schema or public types.

**Release note:** This is now a scope decision rather than a blocker for the first publish.

### 2. Interface Layer Size Budget Exceeded — No CI Guards

The ADR target is `interface` ≤ 6 KB per component. Current measurements:

| Component | Size | Budget |
|---|---|---|
| `syn-checkbox` | ~6.5 KB | 6 KB (marginally over) |
| `syn-button` | ~9.2 KB | 6 KB (~53% over) |

**No CI guards exist** to prevent regressions. The token-efficiency promise to MCP and AI consumers is currently unenforced.

### 3. Examples Layer Size Budget — No CI Guards

ADR target: `examples` ≤ 8 KB per component. No measurements have been taken; no enforcement exists.

### 4. Token-Aware Layer Size Verification Still Needs Design

The current ADR budgets (`interface` ≤ 6 KB, `examples` ≤ 8 KB) still have no CI enforcement, and the next planning step should decide whether these checks stay byte-based or move to token-based validation.

**Next planning direction:** investigate tokenizer-backed verification using a library such as `tiktoken` so the size guardrails match actual LLM consumption costs rather than only filesystem size.

### 5. Config Domain Helpers Not Exposed in Public API

`getOverride()` and `getClustersForEntity()` are exported from `src/config/index.ts` but are **not re-exported** from `src/public/index.ts` or `src/index.ts`. External consumers (e.g., tooling that wants to know which cluster `syn-button` belongs to, or read its Figma component ID) have no public path to this data.

CONFIG_SYSTEM.md listed `getComponentOverride()` as a desired public API helper — it has not been added.

### 6. No Unit Tests — Integration Tests Only

The test suite covers the build pipeline and output artifacts end-to-end but has no unit tests for:

- Individual domain query functions (`searchIcons`, `getComponentMetadata`, etc.)
- Store methods (`findEntities`, `getLayerFiles`)
- Utility helpers (`collectLayerReferences`, `paginate`, `sortByEntityId`)
- Config loading edge cases (missing override file, malformed JSON, missing `_docs.json`)

Integration tests depend on environment state (whether a prior `build:data` has run, whether Storybook examples are present), which makes isolated failure diagnosis harder.

### 7. Migration Tools Bypass the Public API

`packages/mcp/src/utilities/migration.ts` and `davinci.ts` use `createMetadataStore()` directly with raw layer file reads rather than going through the higher-level `getMigrations()` public function. This is intentional for now (the public surface may not expose the needed filtering granularity), but it creates a split between what the public API advertises and what MCP actually needs. Worth revisiting before publishing.

---

## Optimization Opportunities 🔧

### 1. Trim Interface Layer Content

The interface layer writer currently emits full CEM-derived Markdown including all attributes, properties, CSS parts, slots, events, and methods in table format. For complex components like `syn-button`, this exceeds the 6 KB budget.

Options:

- Prune private/deprecated members more aggressively during write (already done partly)
- Move CSS parts and CSS custom properties to an opt-in section (rarely needed for AI consumption)
- Split the `.md` file into a compact summary block (≤ 2 KB) and a full detail section that mirrors existing verbosity tiers

### 2. Interface Layer JSON Snapshot Is Under-Used

Each `interface/component/component:syn-*.json` snapshot file contains enrichment metadata (Figma IDs, cluster memberships) but the public API has no surface to query it directly. Consumers who want Figma links or cluster data have to parse layer files manually. Exposing this through the public API (see gap #5) would complete the picture.

### 3. `searchIcons` Loads All Assets Into Memory

`searchIcons()` loads every icon set entity into memory and scans all icons linearly on every call. For large 2025 icon sets (filled + outlined), this is unbounded in memory and linear in time with no index.

A simple improvement: build an inverted index (tag → icon, category → icon) at `build:data` time and write it to `data/index.json` as an `iconSearch` section, allowing O(1) lookup per query.

### 4. No Build-Time Layer Size Metrics

The build pipeline logs entity counts but not layer sizes. A post-write step that emits a size table (entity → layer → bytes) and fails if anything exceeds the ADR budget would give immediate feedback integrated into the normal build, without needing a separate script.

A small addition after `writeLayerAssets()` in `build.ts` using `fs.stat` would cover this.

### 5. Store Instance Per-Call — No Shared Cache

`createMetadataStore()` creates a new store instance per call. Each instance reads `index.json` from disk on the first `getIndex()` call. In the MCP server (a long-running process), this means repeated cold reads of the same file.

Consider an optional singleton or cache mode: `storeOptions.cache = true` returning a shared instance keyed on `dataDir`, or a module-level default store that the MCP server can initialise once at startup.

### 6. Clustering Is Components-Only

The clustering system in `config/clustering/components-by-tag/` only has meaningful data for components. Token groups, style families, and font packages could benefit from the same abstraction — especially for MCP consumers asking "what tokens relate to color themes?".

### 7. Asymmetric Domain API — No `getDataForFonts`

`listFonts()` and `getFontMetadata()` exist, but there is no `getDataForFonts()` (with layer content retrieval). Fonts have a `full` layer with source files, but there is no convenience wrapper to retrieve that content the way `getDataForComponent()` or `getDataForStyle()` works. Minor inconsistency worth smoothing before the first npm publish.

---

## Summary

| Area | Status |
|---|---|
| FINDINGS.md issues | ✅ 7/7 closed |
| CONFIG_SYSTEM.md next steps | ⚠️ 4/5 done — public API helpers missing |
| MCP migration (14 tools) | ✅ Complete |
| Storybook facade refactor | ✅ Complete |
| ADR schema fields (`shortDescription`, `llmHint`, `usageHints`) | ✅ Deferred from `1.0.0` scope |
| Interface layer size budget (≤ 6 KB) | ⚠️ Over budget for complex components — no CI guard |
| Examples layer size budget (≤ 8 KB) | ⚠️ Not measured — no CI guard |
| Storybook failure handling | ✅ `build:all` fails on scrape errors |
| Unit tests | ❌ None — integration-only test suite |
| Build-time size metrics | ❌ Not implemented |

## Next Planning Focus

The next substantial release-hardening task is layer size verification. The current package needs an explicit plan for how to measure and enforce `interface` and `examples` budgets, and a tokenizer-backed approach using a package such as `tiktoken` is a strong candidate because it tracks model-facing token cost more directly than bytes alone.
