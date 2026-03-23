/**
 * Write layer assets (markup, source code snapshots, etc.)
 * Copies source files to data/layers/full/{kind}/{id}/ and builds layer references.
 */

import { copyFile } from 'node:fs/promises';
import { basename, join, relative } from 'node:path';
import { type Result, err, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type WriteError } from '../core/errors.js';
import { type CoreEntity } from '../schemas/index.js';
import { type LayerRef } from '../schemas/layer-ref.js';
import { ensureDir } from './fs-utils.js';

export interface EntityLayers {
  [entityId: string]: Record<string, LayerRef[]>;
}

/**
 * Write layer assets to data/layers/{layer}/{kind}/{id}/...
 * Copies source files for each entity and builds layer references.
 */
export async function writeLayerAssets(
  entities: CoreEntity[],
  outputDir: string,
  repoRoot: string,
  ctx: Context,
): Promise<Result<EntityLayers, WriteError>> {
  ctx.logger?.info('Writing layer assets');

  const layersDir = join(outputDir, 'layers');
  const layersByEntity: EntityLayers = {};

  try {
    await ensureDir(layersDir);
  } catch (cause) {
    return err({
      details: { cause: String(cause) },
      kind: 'write',
      message: 'Failed to prepare layers directory',
      path: layersDir,
    });
  }

  // Process each entity's source files
  for (const entity of entities) {
    if (!entity.sources || entity.sources.length === 0) {
      continue;
    }

    const layerRefs: LayerRef[] = [];

    try {
      // Create entity's layer directory
      const entityLayerDir = join(layersDir, 'full', entity.kind, entity.id);
      await ensureDir(entityLayerDir);

      // Copy each source file
      for (const sourcePath of entity.sources) {
        const fullSourcePath = join(repoRoot, sourcePath);
        const fileName = basename(sourcePath);
        const destPath = join(entityLayerDir, fileName);

        try {
          await copyFile(fullSourcePath, destPath);

          const relativeLayerPath = relative(
            outputDir,
            destPath,
          );

          layerRefs.push({
            layer: 'full',
            path: relativeLayerPath,
          });

          ctx.logger?.debug(`Copied source: ${sourcePath} -> ${relativeLayerPath}`);
        } catch (copyError) {
          ctx.logger?.warn(
            `Failed to copy source file ${sourcePath}: ${copyError instanceof Error ? copyError.message : String(copyError)}`,
          );
        }
      }

      if (layerRefs.length > 0) {
        layersByEntity[entity.id] = {
          full: layerRefs,
        };
      }
    } catch (cause) {
      ctx.logger?.warn(
        `Failed to process layers for ${entity.id}: ${cause instanceof Error ? cause.message : String(cause)}`,
      );
    }
  }

  ctx.logger?.info(`Processed layers for ${Object.keys(layersByEntity).length} entities`);
  return ok(layersByEntity);
}
