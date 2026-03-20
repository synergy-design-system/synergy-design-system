/**
 * Main CLI entry point: orchestrate the entire metadata build.
 *
 * Steps:
 * 1. Run all source pipelines (collectors) in parallel
 * 2. Aggregate results
 * 3. Validate entities
 * 4. Write artifacts to data/
 * 5. Generate JSON schemas
 */
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
import { type Manifest } from '../schemas/index.js';
import { CoreEntitySchema, LayerRefSchema, ManifestSchema } from '../schemas/index.js';

const logger = createConsoleLogger('metadata-build');

async function main() {
  const ctx: Context = {
    logger,
    signal: undefined,
    workspaceRoot: process.cwd(),
  };

  ctx.logger?.info('=== Synergy Metadata Build ===');
  ctx.logger?.info(`Workspace: ${ctx.workspaceRoot}`);

  try {
    // Step 1: Run pipelines
    ctx.logger?.info('Step 1: Running source pipelines');
    const componentsResult = await runSourcePipeline(
      componentsPipeline,
      { packagePath: 'packages/components' },
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

    // Step 4: Build index
    ctx.logger?.info('Step 4: Building index');
    const indexResult = buildIndex(validated.value, ctx);
    if (!indexResult.ok) {
      ctx.logger?.error('Index build failed', indexResult.error);
      process.exit(1);
    }

    // Step 5: Write artifacts
    ctx.logger?.info('Step 5: Writing artifacts');
    const outputDir = 'data';

    const coreResult = await writeCoreEntities(validated.value, outputDir, ctx);
    if (!coreResult.ok) {
      ctx.logger?.error('Writing core failed', coreResult.error);
      process.exit(1);
    }

    const layersResult = await writeLayerAssets(outputDir, ctx);
    if (!layersResult.ok) {
      ctx.logger?.error('Writing layers failed', layersResult.error);
      process.exit(1);
    }

    const indexWriteResult = await writeIndex(indexResult.value, outputDir, ctx);
    if (!indexWriteResult.ok) {
      ctx.logger?.error('Writing index failed', indexWriteResult.error);
      process.exit(1);
    }

    // Step 6: Create and write manifest
    ctx.logger?.info('Step 6: Creating manifest');
    const manifest: Manifest = {
      builtAt: new Date().toISOString(),
      sources: [{
        entityCount: validated.value.length,
        source: 'components',
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

    // Step 7: Generate JSON schemas
    ctx.logger?.info('Step 7: Generating JSON schemas');
    const schemas = {
      'core-entity.schema.json': CoreEntitySchema.toJSONSchema(),
      'layer-ref.schema.json': LayerRefSchema.toJSONSchema(),
      'manifest.schema.json': ManifestSchema.toJSONSchema(),
    };

    ctx.logger?.info('Schemas generated (would be written to data/schemas/ in real implementation)');
    for (const [name, schema] of Object.entries(schemas)) {
      ctx.logger?.debug(`  - ${name}: ${JSON.stringify(schema).length} bytes`);
    }

    ctx.logger?.info('=== Build Complete ===');
    ctx.logger?.info(`Entities: ${validated.value.length}`);
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
