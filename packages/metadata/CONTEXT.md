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
- Layer types: `full` (raw source), `interface` (CEM-derived API Markdown), `examples` (usage snippets), `code` (minimal code references) — only `full` is implemented so far.
- Layer content contract:
  - `interface` — Compact, human+AI readable Markdown derived from CEM. Include: name, summary/purpose, props/attributes, events, slots, CSS parts, public methods only. Exclude: private/internal fields, full source code, long prose, class hierarchies. Written to `data/layers/interface/<kind>/<entity-id>.md`.
  - `examples` — Curated usage examples (sourced from Storybook). One canonical example per core scenario; redundant/deprecated examples trimmed. Written to `data/layers/examples/<kind>/<entity-id>.json`.
  - `code` — Minimal code references/snippets only; no complete source files. Written to `data/layers/code/<kind>/<entity-id>.json`.
  - `full` — Complete source file copies (already implemented).
- Verbosity model (for MCP and all future consumers): `interface | examples | code | full`. Default to `interface` to minimize token usage.
- Token efficiency target (ADR benchmark): `syn-checkbox` through current full MCP response ≈ 22 KB → `interface` layer target ≈ 5 KB (~77% reduction). Use as acceptance benchmark for Phase 2.
- Size budgets (ADR targets, enforced by CI guards once implemented): `interface` ≤ 6 KB, `examples` ≤ 8 KB, `code` ≤ 10 KB per component. Tune thresholds after initial generation.
- Future entity fields specified in ADR but not yet in schema: `shortDescription`, `llmHint`, `usageHints` — short, AI-optimized summary fields for constrained contexts. Decide before first npm publish.
- Framework wrappers are being attached to canonical `component:*` entities instead of being modeled as separate per-framework component entities.
- Layer asset paths are package-namespaced and shallow per entity (`components|react|vue|angular`) to avoid filename collisions across packages.
- Migration artifacts are grouped by concern where needed (DaVinci migration is grouped under `davinci/` in layer output).
- React uses a dual-surface model on top of the canonical component entity:
  - `react.wrapper` for `@lit/react` runtime wrappers
  - `react.jsx` for TSX custom-element typings parsed from the generated types file
- Phase 2 migration constraint for package-level setup entities:
  - Treat `packages/mcp/metadata/packages/tokens/`, `packages/mcp/metadata/packages/styles/`, `packages/mcp/metadata/packages/fonts/`, and `packages/mcp/metadata/packages/assets/` as legacy baseline references for parity checks.
  - Keep metadata generation independent from MCP internals; authoritative inputs for new setup entities come from current monorepo packages (`packages/tokens`, `packages/styles`, `packages/fonts`, `packages/assets`).
  - Phase 2 setup scope is package-facing docs and export surfaces first (README/CHANGELOG/package.json/BREAKING_CHANGES where present), not deep source ingestion.

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

### Tokens/Styles/Fonts/Assets Setup Collectors (Phase 2 setup scope)
- Setup collectors are now implemented for package-level metadata in:
  - `src/internal/collectors/tokens/`
  - `src/internal/collectors/styles/`
  - `src/internal/collectors/fonts/`
  - `src/internal/collectors/assets/`
- Each collector emits one setup entity with package docs + export surface metadata from `package.json`:
  - `setup:tokens-package`
  - `setup:styles-package`
  - `setup:fonts-package`
  - `setup:assets-package`
- `BREAKING_CHANGES.md` is included conditionally where present.

### Tokens Artifact Entities (Phase 2 artifact-depth, partial)
- Token setup metadata remains in `setup:tokens-package` (docs + package metadata only).
- Token artifact files are now emitted as dedicated `token:*` entities (not setup entities):
  - Recursive files under `packages/tokens/dist/` (when present)
  - JSON files under `packages/tokens/src/figma-variables/output/`
- Convenience aliases are deduplicated during collection:
  - `light.css` is skipped when `sick2025_light.css` is present in the same folder
  - `dark.css` is skipped when `sick2025_dark.css` is present in the same folder
- Canonical token artifact path mapping for layers:
  - `packages/tokens/dist/<...>` -> `layers/full/tokens/<...>`
  - `packages/tokens/src/figma-variables/output/<...>` -> `layers/full/tokens/figma-variables/<...>`
- Token entity IDs are generated from the canonical mapped artifact path for predictable lookup.

### Styles Module Entities (Phase 2 artifact-depth, partial)
- Styles setup metadata remains in `setup:styles-package` (docs + package metadata only).
- Styles artifact files are now emitted as dedicated `style:*` entities, one per module folder under `packages/styles/src/`:
  - `style:styles-link`
  - `style:styles-link-list`
  - `style:styles-tables`
  - `style:styles-typography`
- Module selection rule:
  - Ignore top-level `packages/styles/src/index.css`
  - If a module folder has one file, include it (usually `index.css`)
  - If a module folder has more than one file, exclude `index.css`
- Canonical styles path mapping for layers:
  - `packages/styles/src/<module>/<file>.css` -> `layers/full/styles/<module>/<file>.css`

### Fonts Artifact Entity (Phase 2 artifact-depth, partial)
- Fonts setup metadata remains in `setup:fonts-package` (docs + package metadata only).
- Fonts metadata artifact is now emitted as one dedicated entity:
  - `utility:fonts-sick-intl`
- Artifact scope is intentionally metadata-only (no binary font payloads):
  - `packages/fonts/src/sick-intl/font.css`
  - `packages/fonts/src/sick-intl/LICENSE`
- Canonical fonts path mapping for layers:
  - `packages/fonts/src/<...>` -> `layers/full/fonts/<...>`

### Assets Icon Entities (Phase 2 artifact-depth)
- Assets setup metadata remains in `setup:assets-package` (docs + package metadata only).
- Icon metadata is embedded directly in the three icon set entities as a compact `custom.icons` dictionary — **no per-icon entity files are written**.
- Icon set entities emitted:
  - `asset:sick2018-icons` — all sick2018 icons
  - `asset:sick2025-icons-fill` — sick2025 fill variant
  - `asset:sick2025-icons-outline` — sick2025 outline variant
- Each entity's `custom` includes:
  - `theme`, `variant`, `iconCount`, `exportName`
  - `icons: Record<string, { categories?: string[]; tags?: string[] }>` — one key per icon name; entries without Material Symbols taxonomy matches get an empty object `{}`
- Logo file lists are emitted as `asset:sick2018-logos` and `asset:sick2025-logos` with `custom.files`.
- System-icon file lists are emitted as `asset:sick2018-system-icons` and `asset:sick2025-system-icons` with `custom.files`.
- Icon set JS source files are listed in `sources` and copied into `layers/full/assets/`.
- Design decision: embedding icons as a dict in set entities (rather than N individual files) avoids ~3,800 atomic file writes, keeps total data size ~18MB, and keeps build time deterministic.

### Pipeline and CLI
- `runSourcePipeline`, `aggregate`, `validate`, `build-index` wired.
- `runSourcePipeline` now supports async/config-aware enrich steps.
- CLI now runs source pipelines in parallel for:
  - components
  - tokens
  - styles
  - fonts
  - assets
- Aggregation now merges entities from all active pipelines.
- Manifest source reporting includes tokens/styles/fonts/assets in addition to existing framework sources.
- 8-step CLI build pipeline:
  1. Run source pipelines
  2. Aggregate entities
  3. Validate entities (Zod)
  4. Process and write layer assets
  5. Build index
  6. Write core entities (with layer data merged in)
  7. Write index + manifest
  8. Generate and write JSON schemas
- Entity count now varies with artifact availability (especially `dist/`-backed sources).
- Baseline with current workspace state (tokens/styles dist may be empty) is 83 entities:
  - 48 components
  - 12 setup entities
  - 4 token artifact entities (figma-variables output)
  - 4 styles module entities
  - 1 fonts utility artifact entity
  - 8 assets artifact entities (3 icon sets + 2 logos + 2 system-icons + 1 assets setup)
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
- `write-layers.ts`: Copies source files to `data/layers/full/{kind}/{id}/{packageLabel}/` (`components|react|vue|...`) for generic entities, writes generated React JSX type snippet files under `react/`, and maps DaVinci migration paths to `davinci/`.
- `write-layers.ts` now has package-specific canonical path mapping for artifact entities:
  - token entities (`kind=token`, `package=tokens`) are grouped under `data/layers/full/tokens/`
  - style entities (`kind=style`, `package=styles`) are grouped under `data/layers/full/styles/`
  - fonts utility entities (`kind=utility`, `package=fonts`) are grouped under `data/layers/full/fonts/`
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
- Build integration test now also verifies setup entities for:
  - `setup:tokens-package`
  - `setup:styles-package`
  - `setup:fonts-package`
  - `setup:assets-package`
- Build integration test also verifies these setup entities are discoverable through `index.json`.
- Build integration test now verifies token artifact entity materialization and canonical full-layer mapping.
- Build integration test now verifies styles module entity materialization (`style:styles-link`) and canonical full-layer mapping.
- Build integration test now verifies fonts utility artifact materialization (`utility:fonts-sick-intl`) and canonical full-layer mapping.
- Build integration test verifies asset icon set entities (`asset:sick2018-icons`, `asset:sick2025-icons-fill`, `asset:sick2025-icons-outline`) and that their `custom.icons` dict contains valid `categories`/`tags` arrays for icon `add`.
- Build integration test confirms per-icon entities (`asset:sick2018-icon-add` etc.) are NOT present in the index.
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

### Latest Hardening and Config Work (current branch)
- Clustering config was generated from Storybook tags and expanded with concrete group files under `config/clustering/components-by-tag/`.
- Component overrides were expanded under `config/overrides/` to improve enrichment coverage.
- Temporary debug diagnostics were removed from the build + enrichment path to keep CLI output focused and stable.
- Lint/maintainability refactors were applied in critical paths:
  - nested ternaries replaced with explicit control flow in layer writing
  - helper order fixed in component collection to avoid use-before-define issues
  - `JSON.parse` boundaries tightened to `unknown` before schema parsing
- JSON output determinism was strengthened by recursively sorting object keys in shared JSON writer utilities.
- Integration coverage was added for config loading behavior and deterministic JSON serialization ordering.

## Current Limitations
- Only the `full` layer type is implemented (raw source files). `interface`, `examples`, and `code` layers are not yet implemented.
- Phase 2 execution order is now: `examples` layer generation first, then standalone schema-lint CI validation, then public API helper completion.
- Storybook example extraction is planned by reusing/adapting the proven MCP Storybook build/scrape architecture while keeping this package MCP-independent.
- Some metadata values are still fallback/default driven (e.g. `unknown` for missing `since`).
- Package exports expose only generic store queries. ADR-specified domain helpers not yet implemented: `getComponentMetadata(name, layer)`, `listComponents()`, `getTokens()`, `getMigrations()`.
- No CI size budget guards exist yet. These are required before publishing (targets: `interface` ≤ 6 KB, `examples` ≤ 8 KB, `code` ≤ 10 KB).
- MCP has not yet been migrated to consume from this package; it still has its own builder.
- Package not yet published to npm.
- No `llms.txt` file exists yet.
- Tokens, styles, and fonts have partial artifact-depth collectors; assets icon metadata is embedded in set-level entities rather than individual files.


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
- `data/core/setup/setup:tokens-package.json` — package-level Tokens setup metadata
- `data/core/setup/setup:styles-package.json` — package-level Styles setup metadata
- `data/core/setup/setup:fonts-package.json` — package-level Fonts setup metadata
- `data/core/setup/setup:assets-package.json` — package-level Assets setup metadata
- `data/core/token/token:tokens-*.json` — token artifact entities (figma-variables output and optional dist-backed files)
- `data/core/style/style:styles-*.json` — styles module artifact entities (one per `packages/styles/src` module folder)
- `data/core/utility/utility:fonts-sick-intl.json` — fonts metadata artifact entity (`font.css` + `LICENSE`)
- `data/core/asset/asset:sick2018-icons.json` — sick2018 icon set with embedded `custom.icons` dict
- `data/core/asset/asset:sick2025-icons-fill.json` — sick2025 fill icon set with embedded `custom.icons` dict
- `data/core/asset/asset:sick2025-icons-outline.json` — sick2025 outline icon set with embedded `custom.icons` dict
- `data/core/asset/asset:sick2018-logos.json`, `asset:sick2025-logos.json` — logo file lists
- `data/core/asset/asset:sick2018-system-icons.json`, `asset:sick2025-system-icons.json` — system-icon file lists
- `data/layers/full/assets/sick2018/js/index.ts`, `sick2025/js/filled.ts`, `sick2025/js/outline.ts` — icon set JS source copies
- `data/layers/full/component/component:{name}/{components|react|vue}/` — package-namespaced source files copied per component (no filename collisions)
- `data/layers/full/component/component:{name}/angular/` — Angular wrapper source files for each enriched component
- `data/layers/full/component/component:{name}/react/{Syn*JSXElement.ts}` — generated per-component React JSX type snippets
- `data/layers/full/setup/setup:components-package/components/` — Components package docs copied into layers
- `data/layers/full/setup/setup:synergy-migrations/components/` — BREAKING_CHANGES.md copied into layers
- `data/layers/full/setup/setup:synergy-migrations/davinci/` — DaVinci migration guide copied into layers
- `data/layers/full/setup/setup:react-package/` — React package docs/export surface copied into layers
- `data/layers/full/setup/setup:vue-package/` — Vue package docs/export surface copied into layers
- `data/layers/full/setup/setup:tokens-package/` — Tokens package docs/export surface copied into layers
- `data/layers/full/setup/setup:styles-package/` — Styles package docs/export surface copied into layers
- `data/layers/full/setup/setup:fonts-package/` — Fonts package docs/export surface copied into layers
- `data/layers/full/setup/setup:assets-package/` — Assets package docs/export surface copied into layers
- `data/layers/full/tokens/` — canonical token artifact paths (dist surfaces and `figma-variables/` output)
- `data/layers/full/styles/` — canonical styles module paths mapped from `packages/styles/src/*`
- `data/layers/full/fonts/` — canonical fonts metadata paths mapped from `packages/fonts/src/*`
- `data/schemas/core-entity.schema.json`, `layer-ref.schema.json`, `manifest.schema.json`
- `data/index.json` — searchable index; count varies with artifact availability (baseline 83 in current workspace state)
- `data/manifest.json` — build manifest with timestamp and source stats

## ADR Roadmap & Phase Status

The metadata package implements the [ADR 2026-03-13: Proposed Synergy AI Strategy](adr.md). Phase status:

| Phase | Description | Status |
|---|---|---|
| 1 | Establish metadata package as canonical source | ✅ Architecture complete; MCP migration + npm publish pending |
| 2 | Introduce layered metadata + verbosity controls | 🔄 In progress — execution order: `examples` -> schema-lint CI -> public API helpers |
| 3 | Expand distribution (MCP HTTP, npm publish, llms.txt) | ❌ Not started |
| 4 | Refine token efficiency and metadata architecture | ❌ Not started |
| 5 | Cross-platform interoperability (Blockbrain, compatibility matrix) | ❌ Not started |
| 6 | Full governance and stabilization | ❌ Not started |
| 7 | Continuous improvement, new metadata types | ❌ Not started |

### Phase 2 — Concrete Actions
1. Implement `examples` layer for `component:*` entities by extracting/adapting the existing MCP Storybook build pipeline architecture. Output: `data/layers/examples/component/<entity-id>.json`.
2. Add a standalone schema-lint validation step suitable for CI and local runs (script/CLI + CI wiring).
3. Expose ADR-specified layer-aware domain helpers on the public API: `getComponentMetadata(name, layer)`, `listComponents()`, `getTokens()`, `getMigrations()`.
4. Implement `interface` layer generator for `component:*` entities. Source: CEM (`custom-elements.json`) + existing `custom.frameworks.*` metadata. Output: `data/layers/interface/component/<entity-id>.md`. Validate against syn-checkbox ≈ 5 KB target.
5. Implement `code` layer for `component:*` entities. Output: `data/layers/code/component/<entity-id>.json`.
6. Add CI size budget checks: fail PRs where `interface` > 6 KB, `examples` > 8 KB, `code` > 10 KB per entity.

### Phase 3 — Concrete Actions
1. Migrate MCP server to consume from `@synergy-design-system/metadata`; remove all metadata-building logic from MCP.
2. Add `verbosity: 'interface' | 'examples' | 'code' | 'full'` parameter to MCP tools; default `interface`.
3. Enable MCP HTTP transport.
4. Publish `@synergy-design-system/metadata` to npm.
5. Create `llms.txt` in the Synergy docs domain referencing canonical layer URLs.

### Token Efficiency Benchmark (Phase 2 acceptance gate)
- `syn-checkbox` `interface` layer must be ≈ 5 KB or less (current full MCP response ≈ 22 KB, ~77% reduction target).

## Suggested Next Steps
1. **[Phase 2 — current priority]** Implement `examples` layer for component entities by extracting/adapting the MCP Storybook generation flow into metadata package internals.
2. **[Phase 2]** Add a standalone schema-lint validation command and wire it into CI.
3. **[Phase 2]** Expose layer-aware public API helpers: `getComponentMetadata(name, layer)`, `listComponents()`, `getTokens()`, `getMigrations()`.
4. **[Phase 2]** Implement `interface` layer for component entities: CEM-derived Markdown, ≤ 6 KB target, written to `data/layers/interface/component/<entity-id>.md`. Validate against syn-checkbox ≈ 5 KB benchmark.
5. **[Phase 2]** Implement `code` layer for component entities (minimal code references only).
6. **[Phase 2]** Add CI size budget guards (fail on `interface` > 6 KB, `examples` > 8 KB, `code` > 10 KB).
7. Decide whether to add `shortDescription`/`llmHint`/`usageHints` fields to `CoreEntity` schema before first npm publish.
8. Decide whether to model Angular validators/value-accessors as additional structured metadata in `custom.frameworks.angular` beyond setup entities.
9. **[Phase 3]** Migrate MCP to consume from this package; publish to npm; create `llms.txt`; enable MCP HTTP transport.

## Resume Notes
- If build fails on components manifest path, ensure components package has been built so `dist/custom-elements.json` exists.
- Keep metadata package independent from MCP package internals.
- For Phase 2 parity checks, always compare package-level setup outputs against legacy MCP metadata folders under `packages/mcp/metadata/packages/{tokens|styles|fonts|assets}/`.
- For Phase 2 setup entities, keep `BREAKING_CHANGES.md` optional per package and include it only when present.
- Phase 2 setup-entity rollout is complete at 12 setup entities; total index size now varies as artifact entities are introduced.
- Token setup vs artifact rule:
  - `setup:tokens-package` is setup-only
  - token artifacts are emitted as `token:*` entities and mapped under `layers/full/tokens/`
- Styles setup vs artifact rule:
  - `setup:styles-package` is setup-only
  - styles module artifacts are emitted as `style:*` entities and mapped under `layers/full/styles/`
- Fonts setup vs artifact rule:
  - `setup:fonts-package` is setup-only
  - fonts metadata artifacts are emitted as `utility:*` entities and mapped under `layers/full/fonts/`
- Assets icon metadata rule:
  - Icon taxonomy (categories/tags) is embedded as `custom.icons` dict in the 3 set-level `asset:*` entities.
  - No per-icon entity files are written; this keeps data size ~18MB and build time deterministic.
  - Run `pnpm clean` before `pnpm test:with-build` to remove any stale files from previous builds (the build does not auto-clean its output directory).
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
