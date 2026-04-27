# Metadata Configuration

This directory contains configuration files that augment the generated metadata with custom groupings, overrides, and external data sources.

## Structure

```
config/
├── overrides/           # Per-entity customizations (Figma IDs, story tags, etc.)
│   └── component:*.json
├── rules/               # Per-component rules and guidance content
│   └── component:*.js
├── clustering/          # Virtual groupings of entities
│   ├── components-by-tag/
│   ├── components-by-purpose/
│   └── tokens-by-domain/
└── artifacts/           # (Future) Other artifact types
```

## Overrides

Override files add metadata to specific entities without modifying generated data:

```json
{
  "figmaComponentId": "16967-26428",
  "storyTags": ["Structure"],
  "storySourcePath": "components.accordion"
}
```

These values are enriched by transformers that pull from external data sources (e.g., `_docs.json`).

## Clustering

Clustering files define virtual groupings of entities for organization and filtering:

```json
{
  "name": "Structure Components",
  "description": "Components for organizing and structuring page layouts",
  "entities": ["component:syn-accordion", "component:syn-details", ...]
}
```

Multiple clustering files can reference the same entity.

## Rules

Rules files define structured guidance for components (use cases, usage guidance, accessibility notes, known issues, and related links/components).

Rules are stored as JavaScript modules in `rules/` and are type-checked with `// @ts-check` and JSDoc typing.

Example (`rules/component:syn-badge.js`):

```js
// @ts-check

/** @type {import('../../src/config/types.js').ComponentRules} */
export default {
  component: "syn-badge",
  related: {
    components: ["syn-tag"],
    templates: ["status-indicator"],
  },
  useCases: ["Show concise status information in lists and tables."],
  usageGuidelines: {
    dos: ["Keep badge labels short and scannable."],
    donts: ["Do not use a badge as the only source of critical information."],
  },
  accessibility: {
    considerations: [
      "Provide context so badge meaning is clear without color.",
    ],
  },
  knownIssues: [],
};
```

Naming convention:

- File name: `component:<tag-name>.js`
- `component` field value: `<tag-name>`
- One rule file per real custom element

Validation:

- Run `pnpm run build:ts` in `packages/metadata` to type-check rules files.
- Rules are loaded through the metadata config loader from `config/rules`.

## External Data Sources

Stored separately in `../external-data/`:

- `storybook/_docs.json` — Storybook story structure, titles, and descriptions (source of truth for story documentation)
- (Future additions scoped by artifact type)
