# @synergy-design-system/metadata

Machine-readable metadata for the Synergy Design System.

## Public API

This package publishes a stable runtime query API and metadata artifacts.
Internal collector/pipeline/CLI modules are intentionally not part of the public contract.

```ts
import { createMetadataStore } from '@synergy-design-system/metadata';

const store = createMetadataStore();
const components = await store.getPackageEntities('components');
const migrationFiles = await store.getDataForLayer('migrations', 'full');
```

### Supported exports

- `@synergy-design-system/metadata`
- `@synergy-design-system/metadata/public`

### Public data artifacts

- `data/index.json`
- `data/core/**`
- `data/layers/**`
- `data/manifest.json`
- `data/schemas/**`

## Internal Modules

Collectors, writers, pipeline orchestration, and CLI build logic are internal runtime behavior and may change without notice.
