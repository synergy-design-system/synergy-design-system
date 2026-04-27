# @synergy-design-system/metadata

Machine-readable metadata for the Synergy Design System.

## Public API

This package publishes a stable runtime query API and metadata artifacts.

```ts
import {
  clearMetadataStoreCache,
  createMetadataStore,
} from "@synergy-design-system/metadata";

const store = createMetadataStore();
const components = await store.getPackageEntities("components");
const migrationFiles = await store.getDataForLayer("migrations", "full");

// Optional: explicitly clear process-local caches (for tests or controlled refresh flows)
clearMetadataStoreCache();
```

### Cache Behavior

`createMetadataStore()` uses a process-local read-through cache for:

- `data/index.json`
- core entity JSON files under `data/core/**`
- layer file content reads via `readLayerFile`

Cache entries are scoped by `dataDir` and are shared across store instances in the same Node.js process.
For production, this means metadata behaves as an immutable snapshot per deploy/process lifetime.

Use `clearMetadataStoreCache()` when you need to force a refresh without restarting the process (for example in tests).

### Component Cluster Queries

Component metadata can be grouped via cluster ids (for example `components-by-tag/structure`).
You can list cluster groups and filter component queries by cluster.

```ts
import {
  listComponentClusters,
  listComponents,
  listComponentsByCluster,
} from "@synergy-design-system/metadata";

const clusters = await listComponentClusters();
const structureComponents = await listComponents({
  cluster: "components-by-tag/structure",
});
const sameResult = await listComponentsByCluster("components-by-tag/structure");
```

`cluster` accepts a single cluster id or an array of ids.

### Layer Content Workflow

Layer APIs return file references first. Resolve file contents through `readLayerFile`.

```ts
import {
  createMetadataStore,
  getComponentMetadata,
  readLayerFilesForEntity,
} from "@synergy-design-system/metadata";

const store = createMetadataStore();

const component = await getComponentMetadata("syn-header", {
  includeLayerRefs: true,
  layer: "full",
});

if (component.data) {
  const files = await readLayerFilesForEntity(store, component.data, "full");
  const firstFile = files.at(0);
  console.log(firstFile?.ref.path, firstFile?.content);
}
```

Use this flow when you need real file content (for example framework wrappers, styles, or examples), not only layer file paths.

### Public data artifacts

- `data/index.json`
- `data/core/**`
- `data/layers/**`
- `data/manifest.json`
- `data/schemas/**`

## Internal Modules

Collectors, writers, pipeline orchestration, schemas, core helpers, and CLI build logic live under `src/internal/` and are internal runtime behavior that may change without notice.

For repository-local tooling, an internal barrel exists at `src/internal/index.ts`, but it is intentionally not exported or published as part of the package contract.
