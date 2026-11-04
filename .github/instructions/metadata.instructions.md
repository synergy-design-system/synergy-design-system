---
description: "Use when changing component rules, metadata sources, collectors, schemas, generation, metadata APIs, or MCP consumers. Check semantic coverage as well as schema validity."
applyTo: "packages/metadata/**,packages/mcp/**"
---

# Metadata and component rules

Read the [metadata README](../../packages/metadata/README.md), [configuration guide](../../packages/metadata/config/README.md), and [package scripts](../../packages/metadata/package.json).

## Ownership and propagation

- Author guidance in `packages/metadata/config/rules/component__syn-*.js`; configuration also includes overrides and clustering. Collection and runtime behavior live under `packages/metadata/src/`.
- **All of `packages/metadata/data/**` is read-only for manual changes**, including copied TypeScript, JavaScript, CSS, examples and package files, not just generated JSON or Markdown. Inspection is allowed. Do not edit, format, refactor or bulk-replace anything there; trace copies back to their canonical sources outside `data/`. Only the metadata generator may update this directory.
- `dist/**` is also generated. Update the appropriate source, collector, rule or override and regenerate rather than repairing output by hand.
- Framework sources collected into metadata are generated too: all React/Vue `src/**`, Angular `components/**`, `directives/**`, `modules/**` and root `index.ts`. Never patch these files or their metadata copies. Follow the [component generation boundaries](./components.instructions.md), update component sources or generators under `packages/components/scripts/`, and regenerate wrappers before refreshing metadata.
- The pipeline collects and validates entities, enriches them with configuration, then writes layers, core entities, the index, manifest and schemas. Rebuild upstream packages first when their collected outputs change.
- Rules are loaded and schema-parsed from config, then rendered into generated rule layers. Keep the filename, exported `component`, and real component tag consistent.
- Treat collected Storybook examples as generated input: use the documented scraper workflow rather than manually patching its output.

## Review rule contents, not just structure

For every affected component, compare its rules with implementation, tests, manifest and stories:

- Are all new public capabilities and intended use cases represented?
- Are API names, defaults, allowed values, styling hooks and references real and current?
- Are composition restrictions, accessibility guidance, known issues and brand differences accurate?
- Did a behavior change invalidate an existing instruction or remove a limitation?
- Do related component/template links target existing entities?

Schema validation checks structure, not completeness or truth. Do not add speculative rules or claim a capability just because another component supports it.
For non-component features, inspect the relevant collector/layer and confirm the feature reaches metadata consumers; explain a genuine no-impact result.

## Build and validate

Run from the repository root:

```bash
pnpm --filter @synergy-design-system/metadata run build
pnpm --filter @synergy-design-system/metadata run lint:schemas
pnpm --filter @synergy-design-system/metadata test
```

`build:ts` compiles source and type-checks rules; `build` also regenerates metadata data.
Use `build:all` when Storybook-derived examples must be refreshed, not as the default for every rule edit.
Use focused tests when available, and inspect generated output for the actual changed contract. Existing schema tests sample data and do not replace semantic checks.

MCP consumes metadata APIs and generated artifacts. Build refreshed metadata before checking affected MCP tools, resources or prompts.
The static knowledge site also consumes metadata; follow the [documentation instructions](./documentation.instructions.md) when its routes or rendered contracts are affected.
