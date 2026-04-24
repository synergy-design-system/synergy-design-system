# Metadata Configuration

This directory contains configuration files that augment the generated metadata with custom groupings, overrides, and external data sources.

## Structure

```
config/
├── overrides/           # Per-entity customizations (Figma IDs, story tags, etc.)
│   └── component:*.json
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

## External Data Sources

Stored separately in `../external-data/`:

- `storybook/_docs.json` — Storybook story structure, titles, and descriptions (source of truth for story documentation)
- (Future additions scoped by artifact type)
