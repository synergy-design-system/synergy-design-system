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

### Component Cluster Queries

Component metadata can be grouped via cluster ids (for example `components-by-tag/structure`).
You can list cluster groups and filter component queries by cluster.

```ts
import {
	listComponentClusters,
	listComponents,
	listComponentsByCluster,
} from '@synergy-design-system/metadata';

const clusters = await listComponentClusters();
const structureComponents = await listComponents({
	cluster: 'components-by-tag/structure',
});
const sameResult = await listComponentsByCluster('components-by-tag/structure');
```

`cluster` accepts a single cluster id or an array of ids.

### Layer Content Workflow

Layer APIs return file references first. Resolve file contents through `readLayerFile`.

```ts
import {
	createMetadataStore,
	getComponentMetadata,
	readLayerFilesForEntity,
} from '@synergy-design-system/metadata';

const store = createMetadataStore();

const component = await getComponentMetadata('syn-header', {
	includeLayerRefs: true,
	layer: 'full',
});

if (component.data) {
	const files = await readLayerFilesForEntity(store, component.data, 'full');
	const firstFile = files.at(0);
	console.log(firstFile?.ref.path, firstFile?.content);
}
```

Use this flow when you need real file content (for example framework wrappers, styles, or examples), not only layer file paths.

### Supported exports

- `@synergy-design-system/metadata`
- `@synergy-design-system/metadata/public`

### Public data artifacts

- `data/index.json`
- `data/core/**`
- `data/layers/**`
- `data/manifest.json`
- `data/schemas/**`

## Release Scope

For `1.0.0`, the published contract is the stable runtime query API plus the generated metadata artifacts listed above.
The ADR-proposed summary fields `shortDescription`, `llmHint`, and `usageHints` are intentionally deferred from `1.0.0` and are not part of the current schema or public types.

## Internal Modules

Collectors, writers, pipeline orchestration, schemas, core helpers, and CLI build logic live under `src/internal/` and are internal runtime behavior that may change without notice.

For repository-local tooling, an internal barrel exists at `src/internal/index.ts`, but it is intentionally not exported or published as part of the package contract.
