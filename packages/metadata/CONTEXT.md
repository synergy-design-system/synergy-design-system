# Metadata Package Context Handoff

## Goal
Build a standalone metadata package that replaces MCP-coupled metadata generation.

## Key Decisions
- Metadata package must not depend on MCP metadata output paths.
- Data generation follows a layered model:
  - core: canonical machine-readable metadata
  - layers: audience/use-case specific artifacts
  - index: searchable lookup
- Output directory is `data/` (currently not gitignored and expected to be committed), not dist.
- Validation/contracts use Zod v4.
- JSON Schema generation uses native Zod v4 support via toJSONSchema().
- Entity IDs use a namespaced format: `kind:name` (e.g. `component:syn-button`, `token:color-primary`).
- Layer types: `full` (raw source), `interface` (API/JSDocs), `examples` (usage snippets) — only `full` is implemented so far.
- Framework wrappers are being attached to canonical `component:*` entities instead of being modeled as separate per-framework component entities.
- Layer asset paths are package-namespaced and shallow per entity (`components|react|vue|angular`) to avoid filename collisions across packages.
- React uses a dual-surface model on top of the canonical component entity:
  - `react.wrapper` for `@lit/react` runtime wrappers
  - `react.jsx` for TSX custom-element typings parsed from the generated types file

## Current Architecture
- Source code root: `src/`
- Persisted outputs root: `data/`
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
- Enrichment is async/config-aware and can attach framework metadata to canonical component entities.

### Vue Framework Enrichment (first framework package)
- Vue was chosen as the first framework integration because the package is flat and only contains wrapper components plus package docs.
- Vue wrapper metadata is attached to existing `component:*` entities under `custom.frameworks.vue`.
- Each enriched component now includes:
  - `componentName` (e.g. `SynVueAccordion`)
  - `packageName` (`@synergy-design-system/vue`)
  - `sourcePath` (wrapper `.vue` file)
  - `exportPath` (`packages/vue/src/index.ts`)
- Vue wrapper source files are appended to component `sources`, which means they are copied into the `full` layer alongside the core web component sources.
- A package-level setup entity is emitted:
  - `setup:vue-package`
- The Vue setup entity indexes package docs and export surface:
  - `packages/vue/README.md`
  - `packages/vue/CHANGELOG.md`
  - `packages/vue/LIMITATIONS.md`
  - `packages/vue/package.json`
  - `packages/vue/src/index.ts`

### React Framework Enrichment
- React metadata is now attached to existing `component:*` entities under `custom.frameworks.react`.
- React is modeled with two sub-surfaces:
  - `wrapper`: runtime wrappers from `packages/react/src/components/*.ts`
  - `jsx`: TSX custom-element typings from `packages/react/src/types/syn-jsx-elements.ts`
- The JSX typing file is parsed with the TypeScript compiler API instead of regex.
- Each enriched component can now include:
  - `custom.frameworks.react.wrapper.componentName`
  - `custom.frameworks.react.wrapper.sourcePath`
  - `custom.frameworks.react.jsx.typeName`
  - `custom.frameworks.react.jsx.events`
  - `custom.frameworks.react.jsx.documentation`
- React wrapper source files are appended to component `sources`, so they are copied into the `full` layer alongside core component sources.
- Per-component React JSX type aliases are split out from the generated `syn-jsx-elements.ts` and written as dedicated generated layer files (e.g. `react/SynAlertJSXElement.ts`).
- Raw JSX type source text (`typeText`) is intentionally not persisted in core entity JSON; it is only used transiently to generate layer files.
- A package-level setup entity is emitted:
  - `setup:react-package`
- The React setup entity indexes package docs and export surface:
  - `packages/react/README.md`
  - `packages/react/CHANGELOG.md`
  - `packages/react/LIMITATIONS.md`
  - `packages/react/package.json`
  - `packages/react/src/index.ts`
  - `packages/react/src/types/syn-jsx-elements.ts`

### Pipeline and CLI
- `runSourcePipeline`, `aggregate`, `validate`, `build-index` wired.
- `runSourcePipeline` now supports async/config-aware enrich steps.
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
- Build now reports the 48 canonical components plus one Vue setup entity.
- Build now reports the 48 canonical components plus one Vue setup entity and one React setup entity.

### Writers (fully implemented)
- `write-core.ts`: Persists `data/core/{kind}/{id}.json` with deterministic sort.
- `write-index.ts`: Persists `data/index.json` with sorted entries and metadata wrapper.
- `write-manifest.ts`: Persists `data/manifest.json`.
- `write-layers.ts`: Copies source files to `data/layers/full/{kind}/{id}/{packageLabel}/` (`components|react|vue|...`), preventing basename collisions, and writes generated React JSX type snippet files under `react/`.
- `write-schemas.ts`: Persists generated JSON schemas to `data/schemas/*.json`.
- `fs-utils.ts`: Shared atomic write helpers (`ensureDir`, `writeJsonAtomic`).

### Test Suite (Mocha + Chai)
- `test/integration/build-success.test.mjs`: Verifies build succeeds and artifacts exist and parse correctly.
- `test/integration/components-preflight.test.mjs`: Verifies actionable error when manifest is missing.
- `test/integration/schema-linting.test.mjs`: 6 tests verifying schema files, entity structure, layer refs, and cross-validation.
- Build integration test now also verifies Vue framework metadata on `component:syn-accordion` and the emitted `setup:vue-package` entity.
- Build integration test now also verifies React framework metadata on canonical component entities and the emitted `setup:react-package` entity.
- All 8 tests passing.
- `pretest` script automatically runs build before tests.

### Tooling
- ESLint: `data/` ignored; `src/**/*.ts` has ETL-appropriate rule relaxations; `test/**/*.mjs` has test-appropriate rule relaxations.
- TypeScript: `data/` excluded from compilation.
- Package scripts include `clean` (`rimraf data dist`) for deterministic rebuilds.
- `data/` is currently not gitignored.

## Current Limitations
- Only the `full` layer type is implemented (raw source files). `interface` (API docs) and `examples` (usage snippets) are not yet implemented.
- Scraped docs ingestion is intentionally out of scope in this phase.
- Some metadata values are still fallback/default driven (e.g. `unknown` for missing `since`).
- Package `exports` field is empty — no public read API for consumers yet.
- Angular framework metadata is not yet incorporated.
- Only the components collector exists; tokens/styles/fonts/assets/docs collectors are not yet implemented.

## Data/Folder State
- `data/core/component/component:{name}.json` — 48 component entity files
- component entities now include `custom.frameworks.vue` and `custom.frameworks.react` where applicable
- `data/core/setup/setup:react-package.json` — package-level React setup metadata
- `data/core/setup/setup:vue-package.json` — package-level Vue setup metadata
- `data/layers/full/component/component:{name}/{components|react|vue}/` — package-namespaced source files copied per component (no filename collisions)
- `data/layers/full/component/component:{name}/react/{Syn*JSXElement.ts}` — generated per-component React JSX type snippets
- `data/layers/full/setup/setup:react-package/` — React package docs/export surface copied into layers
- `data/layers/full/setup/setup:vue-package/` — Vue package docs/export surface copied into layers
- `data/schemas/core-entity.schema.json`, `layer-ref.schema.json`, `manifest.schema.json`
- `data/index.json` — searchable index with 50 entries (48 components + 2 setup entities)
- `data/manifest.json` — build manifest with timestamp and source stats

## Suggested Next Steps
1. Incorporate Angular wrapper metadata and model module/setup artifacts (`SynergyComponentsModule`, forms module, validators) as `setup` entities.
2. Add package-level entities for the remaining low-complexity packages: tokens, styles, fonts, assets.
3. Implement `interface` layer: extract user-facing markdown/API summaries from component and wrapper source files.
4. Decide whether React JSX metadata should later feed generated `interface` markdown directly.
5. Implement `examples` layer later via Storybook/docs scraping.

## Resume Notes
- If build fails on components manifest path, ensure components package has been built so `dist/custom-elements.json` exists.
- Keep metadata package independent from MCP package internals.
- Run `pnpm test` from `packages/metadata/` to build and verify all 8 tests pass.
- Layer assets are written before core entities so layer references are available when entities are serialized.
- React JSX snippet files are generated during layer writing; `typeText` is stripped before core entity serialization.
- Vue support is the first adopted framework pattern: canonical component entity plus attached framework metadata, with package-level framework docs/setup represented as separate `setup:*` entities.
- React support follows the same canonical component pattern and adds AST-based parsing of the generated TSX type surface.
- Next implementation target: Angular, where component wrappers and module/setup artifacts should likely be split between component framework metadata and dedicated `setup:*` entities.
