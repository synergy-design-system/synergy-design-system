/**
 * Main CLI entry point: orchestrate the entire metadata build.
 *
 * Steps:
 * 1. Load configuration (overrides, clustering, artifacts)
 * 2. Run all source pipelines (collectors) in parallel
 * 3. Aggregate results
 * 4. Validate entities
 * 5. Enrich with configuration
 * 6. Run storybook scraper (generates examples files)
 * 7. Process and write layer assets (before core entities)
 * 8. Write core entities with layer data
 * 9. Write supporting artifacts (index, manifest)
 * 10. Generate JSON schemas
 */
import { resolve } from 'node:path';
import { createConsoleLogger } from '../core/context.js';
import { type Context } from '../core/context.js';
import { loadConfig } from '../../config/index.js';
import { runStorybook } from '../collectors/storybook/build-docs.js';
import { createTemplateEntities } from '../collectors/templates.js';
import {
  assetsPipeline,
  componentsPipeline,
  fontsPipeline,
  stylesPipeline,
  tokensPipeline,
} from '../collectors/index.js';
import {
  aggregateEntities,
  buildIndex,
  enrichEntitiesWithConfig,
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
    // Step 1: Load configuration (overrides, clustering, artifacts)
    ctx.logger?.info('Step 1: Loading configuration');
    const configDir = resolve(ctx.workspaceRoot, 'config');
    try {
      ctx.config = await loadConfig(configDir);
      ctx.logger?.info('Configuration loaded', {
        artifactsCount: Object.keys(ctx.config.artifacts).length,
        clusteringCount: ctx.config.clustering.size,
        overridesCount: ctx.config.overrides.size,
      });
    } catch (configErr) {
      ctx.logger?.warn('Failed to load configuration, proceeding without it', {
        error: String(configErr),
      });
    }

    // Step 2: Run all source pipelines (collectors) in parallel
    ctx.logger?.info('Step 2: Running source pipelines');
    const [componentsResult, tokensResult, stylesResult, fontsResult, assetsResult] = await Promise.all([
      runSourcePipeline(
        componentsPipeline,
        {
          angularPackagePath: 'packages/angular',
          packagePath: 'packages/components',
          reactPackagePath: 'packages/react',
          vuePackagePath: 'packages/vue',
        },
        ctx,
      ),
      runSourcePipeline(
        tokensPipeline,
        {
          packagePath: 'packages/tokens',
        },
        ctx,
      ),
      runSourcePipeline(
        stylesPipeline,
        {
          packagePath: 'packages/styles',
        },
        ctx,
      ),
      runSourcePipeline(
        fontsPipeline,
        {
          packagePath: 'packages/fonts',
        },
        ctx,
      ),
      runSourcePipeline(
        assetsPipeline,
        {
          packagePath: 'packages/assets',
        },
        ctx,
      ),
    ]);

    if (!componentsResult.ok) {
      ctx.logger?.error('Components pipeline failed', componentsResult.error);
      process.exit(1);
    }

    if (!tokensResult.ok) {
      ctx.logger?.error('Tokens pipeline failed', tokensResult.error);
      process.exit(1);
    }

    if (!stylesResult.ok) {
      ctx.logger?.error('Styles pipeline failed', stylesResult.error);
      process.exit(1);
    }

    if (!fontsResult.ok) {
      ctx.logger?.error('Fonts pipeline failed', fontsResult.error);
      process.exit(1);
    }

    if (!assetsResult.ok) {
      ctx.logger?.error('Assets pipeline failed', assetsResult.error);
      process.exit(1);
    }

    // Step 3: Aggregate results
    ctx.logger?.info('Step 3: Aggregating entities');
    const aggregated = aggregateEntities([
      componentsResult.value,
      tokensResult.value,
      stylesResult.value,
      fontsResult.value,
      assetsResult.value,
    ], ctx);
    if (!aggregated.ok) {
      ctx.logger?.error('Aggregation failed', aggregated.error);
      process.exit(1);
    }

    // Step 4: Validate entities
    ctx.logger?.info('Step 4: Validating entities');
    const validated = validateEntities(aggregated.value, ctx);
    if (!validated.ok) {
      ctx.logger?.error('Validation failed', validated.error);
      process.exit(1);
    }

    // Step 5: Enrich with configuration
    ctx.logger?.info('Step 5: Enriching entities with configuration');

    const enriched = enrichEntitiesWithConfig(validated.value, ctx);
    const enrichedWithStats = enriched.filter((e) => {
      const custom = (e.custom as Record<string, unknown> | undefined) ?? {};
      return !!custom.override || !!custom.clusters;
    });

    const withOverridesCount = enriched.filter((e) => {
      const custom = (e.custom as Record<string, unknown> | undefined) ?? {};
      return !!custom.override;
    }).length;
    const withClustersCount = enriched.filter((e) => {
      const custom = (e.custom as Record<string, unknown> | undefined) ?? {};
      return !!custom.clusters;
    }).length;

    if (enrichedWithStats.length > 0) {
      ctx.logger?.info(
        `Enriched ${enrichedWithStats.length} entities with config metadata (${withOverridesCount} with overrides, ${withClustersCount} with clusters)`,
      );
    } else if (ctx.config) {
      ctx.logger?.warn('No entities were enriched with config metadata', {
        clusteringCount: ctx.config.clustering.size,
        overridesCount: ctx.config.overrides.size,
      });
    }

    // Calculate repo root (two levels up from metadata package)
    const repoRoot = resolve(ctx.workspaceRoot, '..', '..');

    // Step 6: Run storybook scraper (optional, generates examples files)
    // Only runs if RUN_STORYBOOK_SCRAPER environment variable is set to 'true'
    const runStorybookScraper = process.env.RUN_STORYBOOK_SCRAPER?.toLowerCase() === 'true';
    if (runStorybookScraper) {
      ctx.logger?.info('Step 6: Running storybook scraper');
      const storybookSuccess = await runStorybook('all', ctx);
      if (!storybookSuccess) {
        ctx.logger?.warn(
          'Storybook scraper failed or docs not built yet. Examples will not be included. '
          + 'Run `pnpm -C ../docs build` first if you want examples in the metadata build.',
        );
      }
    } else {
      ctx.logger?.info(
        'Step 6: Skipping storybook scraper (set RUN_STORYBOOK_SCRAPER=true to enable)',
      );
    }

    // Step 7: Process and write layer assets (before core entities)
    ctx.logger?.info('Step 7: Processing layer assets');
    const layersResult = await writeLayerAssets(enriched, outputDir, repoRoot, ctx);
    if (!layersResult.ok) {
      ctx.logger?.error('Writing layers failed', layersResult.error);
      process.exit(1);
    }

    // Merge layer data back into entities (using enriched entities to preserve override/cluster data)
    const entitiesWithLayers: CoreEntity[] = enriched.map((entity) => {
      const layerData = layersResult.value[entity.id];
      if (!layerData) {
        return entity;
      }

      return {
        ...entity,
        layers: layerData,
      };
    });

    // Generate template entities from discovered layer data
    ctx.logger?.info('Step 7b: Generating template metadata');
    const templateEntities = await createTemplateEntities(outputDir);
    if (templateEntities.length > 0) {
      ctx.logger?.info(`Generated ${templateEntities.length} template entities from layer data`);
      entitiesWithLayers.push(...templateEntities);
    }

    // Keep generated-only data in layers; do not persist it in core JSON.
    const entitiesForWrite: CoreEntity[] = entitiesWithLayers.map((entity) => {
      const custom = (entity.custom) ?? {};
      const frameworks = custom.frameworks as Record<string, unknown> | undefined;
      const react = frameworks?.react as Record<string, unknown> | undefined;
      const jsx = react?.jsx as Record<string, unknown> | undefined;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { interfaceSnapshot: _interfaceSnapshot, ...customWithoutInterfaceSnapshot } = custom;

      if (!jsx) {
        return {
          ...entity,
          custom: customWithoutInterfaceSnapshot,
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { typeText, ...jsxWithoutTypeText } = jsx;

      return {
        ...entity,
        custom: {
          ...customWithoutInterfaceSnapshot,
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

    // Step 8: Write core entities with layer data
    ctx.logger?.info('Step 8: Building index');
    const indexResult = buildIndex(entitiesForWrite, ctx);
    if (!indexResult.ok) {
      ctx.logger?.error('Index build failed', indexResult.error);
      process.exit(1);
    }

    // Step 8: Write core entities with layer data (continued)
    ctx.logger?.info('Step 8: Writing core entities');
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

    // Step 9: Write supporting artifacts (index, manifest)
    ctx.logger?.info('Step 9: Creating manifest');
    const manifest: Manifest = {
      builtAt: new Date().toISOString(),
      sources: [{
        entityCount: componentsResult.value.length,
        source: 'components',
        status: 'success',
      }, {
        entityCount: tokensResult.value.length,
        source: 'tokens',
        status: 'success',
      }, {
        entityCount: stylesResult.value.length,
        source: 'styles',
        status: 'success',
      }, {
        entityCount: fontsResult.value.length,
        source: 'fonts',
        status: 'success',
      }, {
        entityCount: assetsResult.value.length,
        source: 'assets',
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

    // Step 10: Generate JSON schemas
    ctx.logger?.info('Step 10: Generating JSON schemas');
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
  console.error('Uncaught error:', err);
  process.exit(1);
});
