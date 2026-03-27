# DX Findings

When creating the first demos using the metadata store, I ran into a couple of issues that I want to highlight and that we should have a look at before going further:

## Common

### Lack of documentation for the public interface

We are missing on DX for the public interface by not providing comments. I added those myself to the assets package.

### Lots of duplicated code

Each of the public interfaces defines some common stuff that we may group together, e.g. `sortEntityById`.

### Lack of fixed types from the model

Maybe we should think about giving users strong types for custom `MetadataEntity` entities.
For example, there is no type support for the `custom` field, editors don´t know that `iconCount` exists on a `MetadataEntity` type Asset.
I think we should have something like this:

```typescript
// Current type
export type MetadataEntity = {
  custom?: Record<string, unknown>;
  id: string;
  kind: string;
  layers?: Record<string, MetadataLayerRef[]>;
  name: string;
  package: string;
  relations: MetadataRelationRef[];
  since: string;
  sources: string[];
  status: string;
  tags: string[];
};

// Current implementation
export const listAssets = async (
  options: AssetQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity[]>> => {

// Future type
export type MetadataEntity<CustomData = Record<string, unknown> = {
  custom?: CustomData;
  id: string;
  kind: string;
  layers?: Record<string, MetadataLayerRef[]>;
  name: string;
  package: string;
  relations: MetadataRelationRef[];
  since: string;
  sources: string[];
  status: string;
  tags: string[];
};

// Next implementation
// Note all types are made up
type MetaDataEntityForOneIcon = {
  categories?: string[];
};

type AssetEntity = {
  exportName: string;
  iconCount: number;
  icons: Record<string, MetaDataEntityForOneIcon>;
  theme: 'sick2018' | 'sick2025';
  variant: 'outline' | 'filled';
};

export const listAssets = async (
  options: AssetQueryOptions = {},
  storeOptions: MetadataStoreOptions = {},
): Promise<PublicResponse<MetadataEntity<AssetEntity[]>> => {
```

We would have to create those types during builds for all metadata types. 

### Lack of using data from the layer level

There are methods on the store to retrieve the layers associated to a given id, e.g. `const entity = await store.getLayerFiles('component:syn-header', 'full');`. However, this does only output the paths. What if I need the content?

Also, I think we need more abstraction on top of what is already there. For example, I don´t want to reinvent a component list all the time:

```typescript
const components = await listComponents({
  includeLayerRefs: false,
  includeSources: false,
});
const componentNames = components.data
  .map(c => c.name)
  .toSorted();
```

I want to reuse this and not write the same boilerplace all the time. I think we need nicer tools for interaction.

## Assets

### Grouped filters

When migrating the MCP action `src/synergy/packages/mcp/src/tools/asset-info.ts`, it came to me that we may need a filter for `theme`. Currently, when requesting theme 2025, I have to do two queries because I cannot group queries. Also, I wanted to include both `tags` and `category` for the icon filtering. However, they don´t work together. Because I did not want to 

##### Accept `assetId` parameters

```typescript
// Before
const iconsFor2025Filled = await searchIcons(
  {
    assetId: 'sick2025-icons-filled',
    tags,
  },
  iconSearchOptions,
);
const iconsFor2025Outlined = await searchIcons(
  {
    assetId: 'sick2025-icons-outline',
    tags,
  },
  iconSearchOptions,
);
newAvailableIcons = [
  ...iconsFor2025Filled.data,
  ...iconsFor2025Outlined.data,
];
```

```typescript
// Solution 1: Multiple assetId
const newAvailableIcons = await searchIcons(
  {
    assetId: ['sick2025-icons-filled', 'sick2025-icons-outline'],
    tags,
  },
  iconSearchOptions,
);

// Solution 2: Search by theme
const newAvailableIcons = await searchIcons(
  {
    assetId: ['sick2025-icons-filled', 'sick2025-icons-outline'],
    theme: 'sick2025', // Or similar, depending on data
    tags,
  },
  iconSearchOptions,
);
```

##### `category` and `tag` query parameters are not inclusive

Currently, when providing a category, `searchIcons` will skip provided `tags` in the filter. However, what if I want to query all fields that include a `category` and multiple `tags`? Also, I may be tempted to search for multiple `categories`. There should be a way to provide the filter type (e.g. `inclusive` or `exclusive`).
