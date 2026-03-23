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
- Migration artifacts are grouped by concern where needed (DaVinci migration is grouped under `davinci/` in layer output).
- React uses a dual-surface model on top of the canonical component entity:
  - `react.wrapper` for `@lit/react` runtime wrappers
  - `react.jsx` for TSX custom-element typings parsed from the generated types file

## Current Architecture
- Source code root: `src/`
- Public runtime surface: `src/public/`
- Internal build/runtime surface: `src/internal/`
- Persisted outputs root: `data/`
- Pipeline shape: collect -> normalize -> enrich -> aggregate -> validate -> write layers -> write core -> write index/manifest/schemas
- Functional Result pattern is used for error flow.
- Public package root (`src/index.ts`) re-exports only the supported runtime query API.
- Internal repo tooling has a dedicated unstable barrel at `src/internal/index.ts` which is not published.

## Implemented So Far

### Core and Contracts
- Result/error/context foundation created under `src/internal/core/`.
- Zod schemas created under `src/internal/schemas/`:
  - core-entity
  - layer-ref
  - snapshot
  - manifest
- Validators wired through `src/internal/schemas/index.ts`.

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

### Angular Framework Enrichment
- Angular metadata is now attached to existing `component:*` entities under `custom.frameworks.angular`.
- Wrapper metadata is extracted from `packages/angular/components/*/*.component.ts` using the TypeScript AST.
- Each enriched component can now include:
  - `custom.frameworks.angular.componentName`
  - `custom.frameworks.angular.selector`
  - `custom.frameworks.angular.sourcePath`
  - `custom.frameworks.angular.exportPath`
- Angular wrapper source files are appended to component `sources`, so they are copied into the `full` layer alongside core component sources.
- Angular setup entities are emitted for package-level and module-level integration:
  - `setup:angular-package`
  - `setup:angular-components-module`
  - `setup:angular-forms-module`
  - `setup:angular-validators-module`
- Angular module setup entities intentionally exclude `ng-package.json` files, since those are build metadata and not consumer-facing integration guidance.

### Components Package and Migration Setup
- Components package setup entity is emitted:
  - `setup:components-package`
- This setup entity indexes package-level docs and metadata:
  - `packages/components/README.md`
  - `packages/components/CHANGELOG.md`
  - `packages/components/BREAKING_CHANGES.md`
  - `packages/components/LIMITATIONS.md`
  - `packages/components/package.json`
- Migration-focused setup entity is emitted:
  - `setup:synergy-migrations`
- Migration setup sources currently include:
  - `packages/components/BREAKING_CHANGES.md`
  - `packages/mcp/metadata/davinci-migration/migration-guide.md`
- In layer output, the DaVinci migration guide is written to a `davinci/` folder under the migration setup entity.

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
- Build now reports 48 canonical components and 8 setup entities for 56 total entities.
- CLI build output directory is configurable via `SYNERGY_METADATA_OUTPUT_DIR`.

### Public Runtime API
- A stable consumer-facing query layer now exists under `src/public/`.
- `createMetadataStore()` is exported publicly and provides:
  - `getIndex()`
  - `getEntity(id)`
  - `findEntities(query)`
  - `getPackageEntities(packageName)`
  - `getLayerFiles(entityId, layer)`
  - `getDataForLayer(packageName, layer)`
- The public runtime reads shipped artifacts from `data/` and does not depend on collectors/pipeline internals.
- Package exports are intentionally restricted to the public API entrypoints and packaged data artifacts.

### Writers (fully implemented)
- `write-core.ts`: Persists `data/core/{kind}/{id}.json` with deterministic sort.
- `write-index.ts`: Persists `data/index.json` with sorted entries and metadata wrapper.
- `write-manifest.ts`: Persists `data/manifest.json`.
- `write-layers.ts`: Copies source files to `data/layers/full/{kind}/{id}/{packageLabel}/` (`components|react|vue|...`), preventing basename collisions, writes generated React JSX type snippet files under `react/`, and maps DaVinci migration paths to `davinci/`.
- `write-schemas.ts`: Persists generated JSON schemas to `data/schemas/*.json`.
- `fs-utils.ts`: Shared atomic write helpers (`ensureDir`, `writeJsonAtomic`).

### Test Suite (Mocha + Chai)
- `test/integration/build-success.test.mjs`: Verifies build succeeds and artifacts exist and parse correctly.
- `test/integration/components-preflight.test.mjs`: Verifies actionable error when manifest is missing.
- `test/integration/public-api.test.mjs`: Verifies the public metadata store works against generated artifacts.
- `test/integration/schema-linting.test.mjs`: 6 tests verifying schema files, entity structure, layer refs, and cross-validation.
- Build integration test now also verifies Vue framework metadata on `component:syn-accordion` and the emitted `setup:vue-package` entity.
- Build integration test now also verifies React framework metadata on canonical component entities and the emitted `setup:react-package` entity.
- Build integration test now also verifies Angular framework metadata on canonical component entities and emitted Angular setup entities.
- Build integration test writes to a temporary output directory instead of mutating committed `data/`.
- 9 tests passing.
- `pretest` now runs TypeScript compilation only; full metadata regeneration is explicit.

### Tooling
- ESLint: `data/` ignored; `src/**/*.ts` has ETL-appropriate rule relaxations; `test/**/*.mjs` has test-appropriate rule relaxations.
- TypeScript: `data/` excluded from compilation.
- Package scripts include `clean` (`rimraf data dist`) for deterministic rebuilds.
- Scripts are split into:
  - `build:ts` for compilation only
  - `build:data` for metadata generation only
  - `build` for both
  - `test:with-build` for explicit rebuild + test
- `data/` is currently not gitignored.
- Only the public API is exported/published; `src/internal/` is for repo-local tooling and build orchestration.

## Current Limitations
- Only the `full` layer type is implemented (raw source files). `interface` (API docs) and `examples` (usage snippets) are not yet implemented.
- Scraped docs ingestion is intentionally out of scope in this phase.
- Some metadata values are still fallback/default driven (e.g. `unknown` for missing `since`).
- Package exports now expose only the public runtime query API; internal build/runtime modules are intentionally unpublished.
- Only the components collector exists; tokens/styles/fonts/assets/docs collectors are not yet implemented.
- The public API currently provides generic store/query access only; domain-specific facades (components/tokens/styles/assets) are not implemented yet.

## Data/Folder State
- `data/core/component/component:{name}.json` — 48 component entity files
- component entities now include `custom.frameworks.vue` and `custom.frameworks.react` where applicable
- `data/core/setup/setup:components-package.json` — package-level Components setup metadata
- `data/core/setup/setup:synergy-migrations.json` — migration-focused setup metadata
- `data/core/setup/setup:react-package.json` — package-level React setup metadata
- `data/core/setup/setup:vue-package.json` — package-level Vue setup metadata
- `data/core/setup/setup:angular-package.json` — package-level Angular setup metadata
- `data/core/setup/setup:angular-components-module.json` — Angular components module setup metadata
- `data/core/setup/setup:angular-forms-module.json` — Angular forms module setup metadata
- `data/core/setup/setup:angular-validators-module.json` — Angular validators module setup metadata
- `data/layers/full/component/component:{name}/{components|react|vue}/` — package-namespaced source files copied per component (no filename collisions)
- `data/layers/full/component/component:{name}/angular/` — Angular wrapper source files for each enriched component
- `data/layers/full/component/component:{name}/react/{Syn*JSXElement.ts}` — generated per-component React JSX type snippets
- `data/layers/full/setup/setup:components-package/components/` — Components package docs copied into layers
- `data/layers/full/setup/setup:synergy-migrations/components/` — BREAKING_CHANGES.md copied into layers
- `data/layers/full/setup/setup:synergy-migrations/davinci/` — DaVinci migration guide copied into layers
- `data/layers/full/setup/setup:react-package/` — React package docs/export surface copied into layers
- `data/layers/full/setup/setup:vue-package/` — Vue package docs/export surface copied into layers
- `data/schemas/core-entity.schema.json`, `layer-ref.schema.json`, `manifest.schema.json`
- `data/index.json` — searchable index with 56 entries (48 components + 8 setup entities)
- `data/manifest.json` — build manifest with timestamp and source stats

## Suggested Next Steps
1. Add package-level entities for the remaining low-complexity packages: tokens, styles, fonts, assets.
2. Build domain-specific public facades on top of the generic store API, starting with components.
3. Add package-level entities for tokens/styles/fonts/assets as their collectors land.
4. Decide whether to model Angular validators/value-accessors as additional structured metadata in `custom.frameworks.angular` beyond setup entities.
5. Implement `interface` layer: extract user-facing markdown/API summaries from component and wrapper source files.
6. Decide whether React JSX metadata should later feed generated `interface` markdown directly.
7. Implement `examples` layer later via Storybook/docs scraping.

## Resume Notes
- If build fails on components manifest path, ensure components package has been built so `dist/custom-elements.json` exists.
- Keep metadata package independent from MCP package internals.
- Run `pnpm test` from `packages/metadata/` for compile + tests without rewriting committed `data/`.
- Run `pnpm build` or `pnpm test:with-build` only when you intentionally want a fresh metadata rebuild.
- Layer assets are written before core entities so layer references are available when entities are serialized.
- React JSX snippet files are generated during layer writing; `typeText` is stripped before core entity serialization.
- Vue support is the first adopted framework pattern: canonical component entity plus attached framework metadata, with package-level framework docs/setup represented as separate `setup:*` entities.
- React support follows the same canonical component pattern and adds AST-based parsing of the generated TSX type surface.
- Angular support now follows the same canonical component pattern and adds module-oriented `setup:*` entities for package integration guidance.
- Components package and migration setup entities are now included (`setup:components-package`, `setup:synergy-migrations`).
- DaVinci migration is intentionally grouped under `davinci/` in layer output.
- The source tree is now physically split into `src/public/` and `src/internal/`.
