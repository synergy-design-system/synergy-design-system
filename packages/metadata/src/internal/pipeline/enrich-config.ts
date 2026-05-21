/**
 * Enrich entities with configuration data (overrides, clustering).
 * Attaches enriched override and clustering info to each entity's custom metadata.
 */

import { type Context } from '../core/context.js';
import { type CoreEntity } from '../schemas/index.js';
import {
  type Cluster,
  type EnrichedOverride,
  getClustersForEntity,
  getOverride,
  getRules,
} from '../../config/index.js';

export interface EnrichedEntity extends CoreEntity {
  custom: CoreEntity['custom'] & {
    clusters?: string[];
    override?: EnrichedOverride;
  };
}

/**
 * Attach config-derived metadata (overrides, clustering) to entities.
 * Returns new array with enriched entities.
 */
export function enrichEntitiesWithConfig(
  entities: CoreEntity[],
  ctx: Context,
): EnrichedEntity[] {
  if (!ctx.config) {
    ctx.logger?.warn('ENRICH: No config loaded, skipping enrichment');
    return entities as EnrichedEntity[];
  }

  ctx.logger?.info(`ENRICH: Starting enrichment of ${entities.length} entities`);

  let enrichedCount = 0;
  let overrideCount = 0;
  let clusterCount = 0;

  const enrichedEntities = entities.map((entity) => {
    const custom = (entity.custom as Record<string, unknown>) ?? {};
    const enriched: Record<string, unknown> = { ...custom };

    // Add rules if they exist for this entity
    const rules = getRules(ctx.config!, entity.id);
    if (rules) {
      enriched.rules = rules;
      enrichedCount += 1;
    }

    // Attach override if one exists for this entity
    const override = getOverride(ctx.config!, entity.id, true);
    if (override) {
      enriched.override = override;
      overrideCount += 1;
      enrichedCount += 1;
    }

    // Attach clustering info
    const clusters = getClustersForEntity(ctx.config!, entity.id);
    if (clusters.length > 0) {
      enriched.clusters = clusters.map((c: Cluster) => {
        // Find cluster ID by searching config
        for (const [clusterId, clusterData] of (ctx.config!).clustering.entries()) {
          if (clusterData === c) {
            return clusterId;
          }
        }
        return 'unknown';
      });
      clusterCount += clusters.length;
      enrichedCount += 1;
    }

    return {
      ...entity,
      custom: enriched,
    };
  });

  ctx.logger?.info(
    `ENRICH: Completed - ${enrichedCount} entities enriched with ${overrideCount} overrides and ${clusterCount} cluster memberships`,
  );

  return enrichedEntities;
}
