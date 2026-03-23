# Metadata Package Context Handoff

## Goal
Build a standalone metadata package that replaces MCP-coupled metadata generation.

## Key Decisions
- Metadata package must not depend on MCP metadata output paths.
- Data generation follows a layered model:
  - core: canonical machine-readable metadata
  - layers: audience/use-case specific artifacts
  - index: searchable lookup
- Output directory is `data/` (**committed to git**), not dist.
- Validation/contracts use Zod v4.
- JSON Schema generation uses native Zod v4 support via toJSONSchema().
- Entity IDs use a namespaced format: `kind:name` (e.g. `component:syn-button`, `token:color-primary`).
- Layer types: `full` (raw source), `interface` (API/JSDocs), `examples` (usage snippets) — only `full` is implemented so far.

## Current Architecture
- Source code root: `src/`
- Persisted outputs root: `data/` (gitignored)
- Pipeline shape: collect -> normalize -> enrich -> aggregate -> validate -> write layers -> write core -> write index/manifest/schemas
- Functional Result pattern is used for error flow.

## Implemented So Far

### Core and Contracts
- Result/error/context foundation created under `src/core/`.
- Zod schemas created under `src/schemas/`:
  - core-entity
  - layer-ref
  - snapshot
  - manifest
- Validators wired through `src/schemas/index.ts`.

### Components Collector
- Collector reads from components package source-of-truth manifest:
  - `packages/components/dist/custom-elements.json`
- Preflight guard: if manifest is missing, returns actionable error with remediation command:
  - `pnpm --filter @synergy-design-system/components build`
- Collector resolves source files from:
  - `packages/components/src/components/<tagNameWithoutPrefix>/`
- Collector uses official CEM types: `CustomElementDeclaration`, `Module`.
- Synergy-specific extension fields (since/status/dependencies/summary/tagNameWithoutPrefix) are read with guarded helpers.
- Normalizer maps collected entries to CoreEntity records.

### Pipeline and CLI
- `runSourcePipeline`, `aggregate`, `validate`, `build-index` wired.
- 8-step CLI build pipeline:
  1. Run source pipelines
  2. Aggregate entities
  3. Validate entities (Zod)
  4. Process and write layer assets
  5. Build index
  6. Write core entities (with layer data merged in)
  7. Write index + manifest
  8. Generate and write JSON schemas
- Build reports 48 components indexed.

### Writers (fully implemented)
- `write-core.ts`: Persists `data/core/{kind}/{id}.json` with deterministic sort.
- `write-index.ts`: Persists `data/index.json` with sorted entries and metadata wrapper.
- `write-manifest.ts`: Persists `data/manifest.json`.
- `write-layers.ts`: Copies source files to `data/layers/full/{kind}/{id}/`, builds LayerRef objects, merges refs back into entities before core write.
- `write-schemas.ts`: Persists generated JSON schemas to `data/schemas/*.json`.
- `fs-utils.ts`: Shared atomic write helpers (`ensureDir`, `writeJsonAtomic`).

### Test Suite (Mocha + Chai)
- `test/integration/build-success.test.mjs`: Verifies build succeeds and artifacts exist and parse correctly.
- `test/integration/components-preflight.test.mjs`: Verifies actionable error when manifest is missing.
- `test/integration/schema-linting.test.mjs`: 6 tests verifying schema files, entity structure, layer refs, and cross-validation.
- All 8 tests passing.
- `pretest` script automatically runs build before tests.

### Tooling
- ESLint: `data/` ignored; `src/**/*.ts` has ETL-appropriate rule relaxations; `test/**/*.mjs` has test-appropriate rule relaxations.
- TypeScript: `data/` excluded from compilation.
- `data/` is gitignored (generated at build time, not committed).

## Current Limitations
- Only the `full` layer type is implemented (raw source files). `interface` (API docs) and `examples` (usage snippets) are not yet implemented.
- Scraped docs ingestion is intentionally out of scope in this phase.
- Some metadata values are still fallback/default driven (e.g. `unknown` for missing `since`).
- Package `exports` field is empty — no public read API for consumers yet.
- Only the components collector exists; tokens/styles/fonts collectors are not yet implemented.

## Data/Folder State (generated, gitignored)
- `data/core/component/component:{name}.json` — 48 component entity files
- `data/layers/full/component/component:{name}/` — source files copied per component
- `data/schemas/core-entity.schema.json`, `layer-ref.schema.json`, `manifest.schema.json`
- `data/index.json` — searchable index with 48 entries
- `data/manifest.json` — build manifest with timestamp and source stats

## Suggested Next Steps
1. Implement `interface` layer: extract JSDoc/API summaries from component source files.
2. Implement `examples` layer: collect demo/usage snippets from `packages/components/src/components/{name}/`.
3. Define package `exports` and a read API (`getEntity`, `search`, `getLayer`) so consumers can use the metadata.
4. Wire into `packages/mcp` as the data source.
5. Add next collector (tokens or styles) to validate architecture reuse.

## Resume Notes
- If build fails on components manifest path, ensure components package has been built so `dist/custom-elements.json` exists.
- Keep metadata package independent from MCP package internals.
- Run `pnpm test` from `packages/metadata/` to build and verify all 8 tests pass.
- Layer assets are written before core entities so layer references are available when entities are serialized.
