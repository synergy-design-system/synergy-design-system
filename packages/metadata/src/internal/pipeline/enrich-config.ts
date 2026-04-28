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

    // @todo Re-enable component rules in metadata output by importing getRules()
    // and attaching enriched.rules here before writing entities.
    // const rules = getRules(ctx.config as any, entity.id);
    // if (rules) {
    //   enriched.rules = rules;
    //   enrichedCount += 1;
    // }

    // Attach override if one exists for this entity
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument
    const override = getOverride(ctx.config as any, entity.id, true);
    if (override) {
      enriched.override = override;
      overrideCount += 1;
      enrichedCount += 1;
    }

    // Attach clustering info
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument
    const clusters = getClustersForEntity(ctx.config as any, entity.id);
    if (clusters.length > 0) {
      enriched.clusters = clusters.map((c: Cluster) => {
        // Find cluster ID by searching config
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        for (const [clusterId, clusterData] of (ctx.config as any).clustering.entries()) {
          if (clusterData === c) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
