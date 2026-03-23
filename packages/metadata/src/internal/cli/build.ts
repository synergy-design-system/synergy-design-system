/**
 * Main CLI entry point: orchestrate the entire metadata build.
 *
 * Steps:
 * 1. Run all source pipelines (collectors) in parallel
 * 2. Aggregate results
 * 3. Validate entities
 * 4. Process and write layer assets (before core entities)
 * 5. Write core entities with layer data
 * 6. Write supporting artifacts (index, manifest)
 * 7. Generate JSON schemas
 */
import { resolve } from 'node:path';
import { createConsoleLogger } from '../core/context.js';
import { type Context } from '../core/context.js';
import { componentsPipeline } from '../collectors/index.js';
import {
  aggregateEntities,
  buildIndex,
  runSourcePipeline,
  validateEntities,
  validateManifestData,
} from '../pipeline/index.js';
import {
  writeCoreEntities,
  writeIndex,
  writeLayerAssets,
  writeManifest,
} from '../writers/index.js';
import { writeSchemas } from '../writers/write-schemas.js';
import { type CoreEntity, type Manifest } from '../schemas/index.js';
import { CoreEntitySchema, LayerRefSchema, ManifestSchema } from '../schemas/index.js';

const logger = createConsoleLogger('metadata-build');

const getOutputDir = (): string => process.env.SYNERGY_METADATA_OUTPUT_DIR?.trim() || 'data';

async function main() {
  const ctx: Context = {
    logger,
    signal: undefined,
    workspaceRoot: process.cwd(),
  };

  ctx.logger?.info('=== Synergy Metadata Build ===');
  ctx.logger?.info(`Workspace: ${ctx.workspaceRoot}`);
  const outputDir = getOutputDir();
  ctx.logger?.info(`Output: ${outputDir}`);

  try {
    // Step 1: Run pipelines
    ctx.logger?.info('Step 1: Running source pipelines');
    const componentsResult = await runSourcePipeline(
      componentsPipeline,
      {
        angularPackagePath: 'packages/angular',
        packagePath: 'packages/components',
        reactPackagePath: 'packages/react',
        vuePackagePath: 'packages/vue',
      },
      ctx,
    );

    if (!componentsResult.ok) {
      ctx.logger?.error('Components pipeline failed', componentsResult.error);
      process.exit(1);
    }

    // Step 2: Aggregate
    ctx.logger?.info('Step 2: Aggregating entities');
    const aggregated = aggregateEntities([componentsResult.value], ctx);
    if (!aggregated.ok) {
      ctx.logger?.error('Aggregation failed', aggregated.error);
      process.exit(1);
    }

    // Step 3: Validate
    ctx.logger?.info('Step 3: Validating entities');
    const validated = validateEntities(aggregated.value, ctx);
    if (!validated.ok) {
      ctx.logger?.error('Validation failed', validated.error);
      process.exit(1);
    }

    // Calculate repo root (two levels up from metadata package)
    const repoRoot = resolve(ctx.workspaceRoot, '..', '..');

    // Step 4: Process layer assets
    ctx.logger?.info('Step 4: Processing layer assets');
    const layersResult = await writeLayerAssets(validated.value, outputDir, repoRoot, ctx);
    if (!layersResult.ok) {
      ctx.logger?.error('Writing layers failed', layersResult.error);
      process.exit(1);
    }

    // Merge layer data back into entities
    const entitiesWithLayers: CoreEntity[] = validated.value.map((entity) => {
      const layerData = layersResult.value[entity.id];
      if (!layerData) {
        return entity;
      }

      return {
        ...entity,
        layers: layerData,
      };
    });

    // Keep raw JSX type text only for generated layer files; do not persist it in core JSON.
    const entitiesForWrite: CoreEntity[] = entitiesWithLayers.map((entity) => {
      const frameworks = (entity.custom as Record<string, unknown> | undefined)?.frameworks as Record<string, unknown> | undefined;
      const react = frameworks?.react as Record<string, unknown> | undefined;
      const jsx = react?.jsx as Record<string, unknown> | undefined;

      if (!jsx) {
        return entity;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { typeText, ...jsxWithoutTypeText } = jsx;

      return {
        ...entity,
        custom: {
          ...entity.custom,
          frameworks: {
            ...frameworks,
            react: {
              ...react,
              jsx: jsxWithoutTypeText,
            },
          },
        },
      };
    });

    // Step 5: Build index
    ctx.logger?.info('Step 5: Building index');
    const indexResult = buildIndex(entitiesForWrite, ctx);
    if (!indexResult.ok) {
      ctx.logger?.error('Index build failed', indexResult.error);
      process.exit(1);
    }

    // Step 6: Write core entities (now with layer data)
    ctx.logger?.info('Step 6: Writing core entities');
    const coreResult = await writeCoreEntities(entitiesForWrite, outputDir, ctx);
    if (!coreResult.ok) {
      ctx.logger?.error('Writing core failed', coreResult.error);
      process.exit(1);
    }

    const indexWriteResult = await writeIndex(indexResult.value, outputDir, ctx);
    if (!indexWriteResult.ok) {
      ctx.logger?.error('Writing index failed', indexWriteResult.error);
      process.exit(1);
    }

    // Step 7: Create and write manifest
    ctx.logger?.info('Step 7: Creating manifest');
    const manifest: Manifest = {
      builtAt: new Date().toISOString(),
      sources: [{
        entityCount: entitiesForWrite.length,
        source: 'components',
        status: 'success',
      }, {
        entityCount: 4,
        source: 'angular',
        status: 'success',
      }, {
        entityCount: 1,
        source: 'react',
        status: 'success',
      }, {
        entityCount: 1,
        source: 'vue',
        status: 'success',
      }],
      synergyVersion: 'local',
      version: '1.0.0',
    };

    const manifestValidated = validateManifestData(manifest, ctx);
    if (!manifestValidated.ok) {
      ctx.logger?.error('Manifest validation failed', manifestValidated.error);
      process.exit(1);
    }

    const manifestWriteResult = await writeManifest(
      manifestValidated.value,
      outputDir,
      ctx,
    );
    if (!manifestWriteResult.ok) {
      ctx.logger?.error('Writing manifest failed', manifestWriteResult.error);
      process.exit(1);
    }

    // Step 8: Generate JSON schemas
    ctx.logger?.info('Step 8: Generating JSON schemas');
    const schemas = {
      'core-entity.schema.json': CoreEntitySchema.toJSONSchema(),
      'layer-ref.schema.json': LayerRefSchema.toJSONSchema(),
      'manifest.schema.json': ManifestSchema.toJSONSchema(),
    };

    const schemasWriteResult = await writeSchemas(schemas, outputDir, ctx);
    if (!schemasWriteResult.ok) {
      ctx.logger?.error('Writing schemas failed', schemasWriteResult.error);
      process.exit(1);
    }

    ctx.logger?.info('=== Build Complete ===');
    ctx.logger?.info(`Entities: ${entitiesForWrite.length}`);
    ctx.logger?.info(`Index entries: ${indexResult.value.length}`);
  } catch (error) {
    ctx.logger?.error('Build failed with exception', { error: String(error) });
    process.exit(1);
  }
}

main().catch((err) => {
  // Catch any unhandled promise rejections
  // eslint-disable-next-line no-console
  console.error('Uncaught error:', err);
  process.exit(1);
});
