/**
 * Cleanup orphaned generated files from data/layers/ and data/core/
 * Removes files that were generated in previous builds but are no longer referenced.
 */
import { glob, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { type Result, err, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type WriteError } from '../core/errors.js';
import { type EntityLayers } from './write-layers.js';

export interface CleanupOptions {
  /**
   * Layer subdirectories to exclude from cleanup (e.g. 'examples' when the
   * Storybook scraper did not run and its output should be preserved as-is).
   */
  excludeLayers?: string[];
}

/**
 * Cleanup orphaned files from data/layers/ and data/core/ directories.
 *
 * This function:
 * 1. Collects all files written in this build (from layersResult and coreEntityIds)
 * 2. Uses glob to find all actual files in layers/ and core/ (excluding .gitkeep)
 * 3. Removes files that exist on disk but were not written in this build
 * 4. Preserves .gitkeep files in all directories
 * 5. Preserves data/schemas/, data/index.json, data/manifest.json (never touched)
 *
 * @param entityLayers - Map of entity ID -> layer refs from writeLayerAssets
 * @param coreEntityIds - Set of entity IDs that were written to data/core/
 * @param outputDir - Base output directory (e.g., 'data')
 * @param ctx - Build context
 * @param options - Optional cleanup configuration
 * @returns Cleanup report with file counts
 */
export async function cleanupOrphanedFiles(
  entityLayers: EntityLayers,
  coreEntityIds: Set<string>,
  outputDir: string,
  ctx: Context,
  options: CleanupOptions = {},
): Promise<Result<{ filesRemoved: number; directoriesVisited: number }, WriteError>> {
  const { excludeLayers = [] } = options;
  try {
    ctx.logger?.info('Step 9.5: Cleaning up orphaned files');

    // Build set of files that should exist
    const writtenFilePaths = new Set<string>();

    // Add layer file paths from entityLayers
    for (const entityId of Object.keys(entityLayers)) {
      const layers = entityLayers[entityId];

      if (layers.full) {
        for (const layerRef of layers.full) {
          writtenFilePaths.add(layerRef.path);
        }
      }

      if (layers.interface) {
        for (const layerRef of layers.interface) {
          writtenFilePaths.add(layerRef.path);
        }
      }

      if (layers.examples) {
        for (const layerRef of layers.examples) {
          writtenFilePaths.add(layerRef.path);
        }
      }
    }

    // Find orphaned layer files using glob
    const layerGlobPattern = join(outputDir, 'layers', '**', '*');
    const actualLayerFilesIter = glob(layerGlobPattern);

    const actualLayerFiles: string[] = [];
    for await (const filePath of actualLayerFilesIter) {
      // Skip .gitkeep files
      if (filePath.includes('.gitkeep')) {
        continue;
      }
      // Skip excluded layer subdirectories (e.g. 'examples' when scraper didn't run)
      if (excludeLayers.some(layer => filePath.includes(`${join(outputDir, 'layers', layer)}`))) {
        continue;
      }
      actualLayerFiles.push(filePath);
    }

    const orphanedLayerFiles: string[] = [];
    for (const filePath of actualLayerFiles) {
      // Convert absolute path to relative (from outputDir)
      const relativePath = filePath.substring(outputDir.length + 1);
      if (!writtenFilePaths.has(relativePath)) {
        orphanedLayerFiles.push(filePath);
      }
    }

    // Remove orphaned layer files
    let filesRemoved = 0;
    for (const orphanedPath of orphanedLayerFiles) {
      try {
        // Skip directories - only remove files
        const stats = await stat(orphanedPath);
        if (!stats.isFile()) {
          continue;
        }

        await rm(orphanedPath, { force: true });
        filesRemoved += 1;
        ctx.logger?.debug(`Removed orphaned layer file: ${orphanedPath}`);
      } catch (removeError) {
        // ENOENT means file was already removed, which is fine
        if ((removeError as NodeJS.ErrnoException).code !== 'ENOENT') {
          ctx.logger?.warn(
            `Failed to remove orphaned file ${orphanedPath}: ${removeError instanceof Error ? removeError.message : String(removeError)}`,
          );
        }
      }
    }

    // Find orphaned core entity files using glob
    const coreGlobPattern = join(outputDir, 'core', '**', '*.json');
    const actualCoreFilesIter = glob(coreGlobPattern);

    const actualCoreFiles: string[] = [];
    for await (const filePath of actualCoreFilesIter) {
      // Skip .gitkeep files
      if (!filePath.includes('.gitkeep')) {
        actualCoreFiles.push(filePath);
      }
    }

    const orphanedCoreFiles: string[] = [];
    for (const filePath of actualCoreFiles) {
      // Extract entity ID from path: data/core/{kind}/{id}.json
      const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
      const entityId = fileName.replace(/\.json$/, '');

      if (!coreEntityIds.has(entityId)) {
        orphanedCoreFiles.push(filePath);
      }
    }

    // Remove orphaned core files
    for (const orphanedPath of orphanedCoreFiles) {
      try {
        // Skip directories - only remove files
        const stats = await stat(orphanedPath);
        if (!stats.isFile()) {
          continue;
        }

        await rm(orphanedPath, { force: true });
        filesRemoved += 1;
        ctx.logger?.debug(`Removed orphaned core file: ${orphanedPath}`);
      } catch (removeError) {
        // ENOENT means file was already removed, which is fine
        if ((removeError as NodeJS.ErrnoException).code !== 'ENOENT') {
          ctx.logger?.warn(
            `Failed to remove orphaned file ${orphanedPath}: ${removeError instanceof Error ? removeError.message : String(removeError)}`,
          );
        }
      }
    }

    if (filesRemoved > 0) {
      ctx.logger?.info(`Cleaned up ${filesRemoved} orphaned files`);
    } else {
      ctx.logger?.debug('No orphaned files found');
    }

    return ok({
      directoriesVisited: 0,
      filesRemoved,
    });
  } catch (cause) {
    return err({
      details: { cause: String(cause) },
      kind: 'write',
      message: 'Failed to cleanup orphaned files',
      path: join(outputDir, 'layers'),
    });
  }
}
