import type { LayerName, MetadataEntity, PublicRequestOptions } from './types.js';

export const sortByEntityId = <T>(entities: MetadataEntity<T>[]): MetadataEntity<T>[] => entities.toSorted((a, b) => a.id.localeCompare(b.id));

export const paginate = <T>(items: T[], limit?: number, offset?: number): T[] => {
  const safeOffset = Math.max(0, offset ?? 0);
  const safeLimit = limit !== undefined ? Math.max(0, limit) : undefined;

  const sliced = items.slice(safeOffset);
  if (safeLimit === undefined) {
    return sliced;
  }

  return sliced.slice(0, safeLimit);
};

export const layerExistsForEntity = <T>(
  entity: MetadataEntity<T>,
  layer: LayerName,
): boolean => !!entity.layers?.[layer] && entity.layers[layer].length > 0;

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
