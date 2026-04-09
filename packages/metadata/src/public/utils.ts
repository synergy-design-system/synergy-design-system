import type {
  LayerName,
  MetadataEntity,
  MetadataLayerRef,
  MetadataStore,
  PublicRequestOptions,
} from './types.js';

export type LayerFileContent = {
  content: string;
  ref: MetadataLayerRef;
};

/**
 * Return a new array sorted by `entity.id` in ascending order.
 */
export const sortByEntityId = <T>(entities: MetadataEntity<T>[]): MetadataEntity<T>[] => entities.toSorted((a, b) => a.id.localeCompare(b.id));

/**
 * Return a paginated slice with safe `offset`/`limit` handling.
 */
export const paginate = <T>(items: T[], limit?: number, offset?: number): T[] => {
  const safeOffset = Math.max(0, offset ?? 0);
  const safeLimit = limit !== undefined ? Math.max(0, limit) : undefined;

  const sliced = items.slice(safeOffset);
  if (safeLimit === undefined) {
    return sliced;
  }

  return sliced.slice(0, safeLimit);
};

/**
 * Collect layer file references from one or more entities.
 * When `layer` is provided, only references from that layer are returned.
 */
export const collectLayerReferences = <T>(
  entities: MetadataEntity<T>[],
  layer?: LayerName,
): MetadataLayerRef[] => {
  const unique = new Map<string, MetadataLayerRef>();

  entities.forEach((entity) => {
    const layers = entity.layers ?? {};

    if (layer) {
      (layers[layer] ?? []).forEach((ref) => {
        unique.set(`${ref.layer}:${ref.path}`, ref);
      });
      return;
    }

    Object.values(layers).forEach((refs) => {
      refs.forEach((ref) => {
        unique.set(`${ref.layer}:${ref.path}`, ref);
      });
    });
  });

  return [...unique.values()];
};

/**
 * Read content for all layer files referenced by a single entity.
 * This is a convenience helper built on top of `store.readLayerFile`.
 */
export const readLayerFilesForEntity = async <T>(
  store: MetadataStore,
  entity: MetadataEntity<T>,
  layer?: LayerName,
): Promise<LayerFileContent[]> => {
  const refs = collectLayerReferences([entity], layer);

  return Promise.all(
    refs.map(async (ref) => ({
      content: await store.readLayerFile(ref),
      ref,
    })),
  );
};

/**
 * Check whether an entity has at least one reference for the requested layer.
 */
export const layerExistsForEntity = <T>(
  entity: MetadataEntity<T>,
  layer: LayerName,
): boolean => !!entity.layers?.[layer] && entity.layers[layer].length > 0;

/**
 * Apply response visibility options to an entity.
 * - `includeLayerRefs=false` removes `layers` from the result
 * - `includeSources=true` includes source references, otherwise returns an empty `sources` array
 */
export const mapEntityForResponse = <T>(
  entity: MetadataEntity<T>,
  options: PublicRequestOptions,
): MetadataEntity<T> => {
  const includeSources = options.includeSources ?? false;
  const includeLayerRefs = options.includeLayerRefs ?? true;

  return {
    ...entity,
    layers: includeLayerRefs ? entity.layers : undefined,
    sources: includeSources ? entity.sources : [],
  };
};
