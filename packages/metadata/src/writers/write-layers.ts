/**
 * Write layer assets (markup, source code snapshots, etc.)
 * Copies source files to data/layers/full/{kind}/{id}/ and builds layer references.
 */

import { copyFile, mkdir, writeFile } from 'node:fs/promises';
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
 * Derive a short package label from a repo-relative source path.
 * e.g. "packages/react/src/components/button.ts" -> "react"
 * Falls back to "_other" for paths not under packages/.
 */
const getPackageLabel = (sourcePath: string): string => {
  const parts = sourcePath.split('/');

  // Keep migration guides grouped by concern instead of their source package.
  if (sourcePath.includes('/davinci-migration/')) {
    return 'davinci';
  }

  return parts[0] === 'packages' && parts[1] ? parts[1] : '_other';
};

/**
 * Extract per-component React JSX type snippets from custom framework metadata.
 * These are generated files (not copies of repo source) derived from the AST parse
 * of syn-jsx-elements.ts, so they live only in the output layers directory.
 */
const getReactJsxSnippets = (
  entity: CoreEntity,
): { fileName: string; text: string }[] => {
  const jsx = (entity.custom as Record<string, unknown> | undefined)
    ?.frameworks as Record<string, unknown> | undefined;
  const reactJsx = jsx?.react as Record<string, unknown> | undefined;
  const jsxMeta = reactJsx?.jsx as Record<string, unknown> | undefined;

  if (!jsxMeta?.typeText || !jsxMeta?.typeName) {
    return [];
  }

  return [{
    fileName: `${jsxMeta.typeName as string}.ts`,
    text: jsxMeta.typeText as string,
  }];
};

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
        // Group files by package label (components|react|vue|angular|…) so that
        // identically-named files from different packages don't collide,
        // e.g. layers/full/component/component:syn-button/react/button.ts
        const packageLabel = getPackageLabel(sourcePath);
        const destPath = join(entityLayerDir, packageLabel, basename(sourcePath));

        try {
          await mkdir(join(entityLayerDir, packageLabel), { recursive: true });
          await copyFile(fullSourcePath, destPath);

          const relativeLayerPath = relative(outputDir, destPath);

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

      // Write generated React JSX type snippets (split from syn-jsx-elements.ts)
      for (const snippet of getReactJsxSnippets(entity)) {
        const destPath = join(entityLayerDir, 'react', snippet.fileName);
        try {
          await mkdir(join(entityLayerDir, 'react'), { recursive: true });
          await writeFile(destPath, snippet.text, 'utf8');
          layerRefs.push({
            layer: 'full',
            path: relative(outputDir, destPath),
          });
          ctx.logger?.debug(`Wrote JSX snippet: ${relative(outputDir, destPath)}`);
        } catch (writeError) {
          ctx.logger?.warn(
            `Failed to write JSX snippet ${snippet.fileName}: ${writeError instanceof Error ? writeError.message : String(writeError)}`,
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
