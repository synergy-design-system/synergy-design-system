/**
 * Write layer assets (markup, source code snapshots, etc.)
 * Copies source files to data/layers/full/{kind}/{id}/ and builds layer references.
 */
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import {
  basename, dirname, join, relative,
} from 'node:path';
import { type Result, err, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type WriteError } from '../core/errors.js';
import { type CoreEntity } from '../schemas/index.js';
import { type LayerRef } from '../schemas/layer-ref.js';
import { type EnrichedOverride, getOverride } from '../../config/index.js';
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

const mapTokenLayerPath = (sourcePath: string): string => {
  if (sourcePath.startsWith('packages/tokens/dist/')) {
    return sourcePath.slice('packages/tokens/dist/'.length);
  }

  if (sourcePath.startsWith('packages/tokens/src/figma-variables/output/')) {
    return `figma-variables/${sourcePath.slice('packages/tokens/src/figma-variables/output/'.length)}`;
  }

  if (sourcePath.startsWith('packages/tokens/')) {
    return sourcePath.slice('packages/tokens/'.length);
  }

  return basename(sourcePath);
};

const mapStyleLayerPath = (sourcePath: string): string => {
  if (sourcePath.startsWith('packages/styles/src/')) {
    return sourcePath.slice('packages/styles/src/'.length);
  }

  if (sourcePath.startsWith('packages/styles/')) {
    return sourcePath.slice('packages/styles/'.length);
  }

  return basename(sourcePath);
};

const mapFontsLayerPath = (sourcePath: string): string => {
  if (sourcePath.startsWith('packages/fonts/src/')) {
    return sourcePath.slice('packages/fonts/src/'.length);
  }

  if (sourcePath.startsWith('packages/fonts/')) {
    return sourcePath.slice('packages/fonts/'.length);
  }

  return basename(sourcePath);
};

const mapAssetsLayerPath = (sourcePath: string): string => {
  if (sourcePath.startsWith('packages/assets/src/')) {
    return sourcePath.slice('packages/assets/src/'.length);
  }

  if (sourcePath.startsWith('packages/assets/')) {
    return sourcePath.slice('packages/assets/'.length);
  }

  return basename(sourcePath);
};

/**
 * Extract per-component React JSX type snippets from custom framework metadata.
 * These are generated files (not copies of repo source) derived from the AST parse
 * of syn-jsx-elements.ts, so they live only in the output layers directory.
 */
const getReactJsxSnippets = (
  entity: CoreEntity,
): { fileName: string; text: string }[] => {
  const jsx = (entity.custom)
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

const getComponentInterfaceSnapshot = (entity: CoreEntity): Record<string, unknown> | undefined => {
  if (entity.kind !== 'component') {
    return undefined;
  }

  const {custom} = entity;
  const snapshot = custom?.interfaceSnapshot;

  if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot)) {
    return undefined;
  }

  return snapshot as Record<string, unknown>;
};

type InterfaceNamedDescription = { description: string; name: string };
type InterfaceAttribute = {
  default?: string;
  description: string;
  name: string;
  reflects: boolean;
  type?: string;
};
type InterfaceProperty = {
  access: 'public' | 'readonly';
  default?: string;
  description: string;
  name: string;
  type?: string;
};
type InterfaceMethod = {
  description: string;
  name: string;
  parameters: Array<{ name: string; type?: string }>;
  returnType?: string;
};
type InterfaceEvent = { description: string; name: string; type?: string };
type InterfaceSnapshot = {
  attributes?: InterfaceAttribute[];
  cssParts?: InterfaceNamedDescription[];
  dependencies?: string[];
  documentation?: string;
  events?: InterfaceEvent[];
  methods?: InterfaceMethod[];
  properties?: InterfaceProperty[];
  since?: string;
  slots?: InterfaceNamedDescription[];
  sourceModulePath?: string;
  status?: string;
  summary?: string;
  tagName?: string;
};

const formatCell = (value: string | undefined): string => {
  if (!value || value.length === 0) {
    return '-';
  }

  return value.replace(/\|/g, '\\|').replace(/\n/g, ' ');
};

const slotDisplayName = (name: string): string => (name.length === 0 ? '(default)' : name);

const renderInterfaceMarkdown = (
  rawSnapshot: Record<string, unknown>,
  enrichedOverride?: EnrichedOverride,
): string => {
  const snapshot = rawSnapshot as InterfaceSnapshot;

  const lines: string[] = [];
  const tagName = snapshot.tagName ?? 'unknown-component';
  const summary = snapshot.summary ?? '';
  const {documentation} = snapshot;
  const sourceModulePath = snapshot.sourceModulePath ?? '-';
  const status = snapshot.status ?? '-';
  const since = snapshot.since ?? '-';
  const slots = snapshot.slots ?? [];
  const attributes = snapshot.attributes ?? [];
  const properties = snapshot.properties ?? [];
  const methods = snapshot.methods ?? [];
  const cssParts = snapshot.cssParts ?? [];
  const events = snapshot.events ?? [];
  const dependencies = snapshot.dependencies ?? [];

  lines.push(`# ${tagName}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(summary.length > 0 ? summary : '-');

  if (documentation) {
    lines.push('');
    lines.push('## Documentation');
    lines.push('');
    lines.push(`[Component Documentation](${documentation})`);
  }

  lines.push('');
  lines.push('## Class Information');
  lines.push('');
  lines.push(`- **Module Path:** ${sourceModulePath}`);
  lines.push(`- **Tag Name:** ${tagName}`);

  lines.push('');
  lines.push('## Available Slots');
  lines.push('');
  lines.push('| Name | Description |');
  lines.push('|------|-------------|');
  for (const slot of slots) {
    lines.push(`| ${formatCell(slotDisplayName(slot.name))} | ${formatCell(slot.description)} |`);
  }
  if (slots.length === 0) {
    lines.push('| - | - |');
  }

  lines.push('');
  lines.push('## Available Attributes');
  lines.push('');
  lines.push('| Name | Type | Default | Description | Reflects |');
  lines.push('|------|------|---------|-------------|----------|');
  for (const attribute of attributes) {
    lines.push(`| ${formatCell(attribute.name)} | ${formatCell(attribute.type)} | ${formatCell(attribute.default)} | ${formatCell(attribute.description)} | ${attribute.reflects ? '✓' : '-'} |`);
  }
  if (attributes.length === 0) {
    lines.push('| - | - | - | - | - |');
  }

  lines.push('');
  lines.push('## Available Properties');
  lines.push('');
  lines.push('| Name | Type | Default | Description | Access |');
  lines.push('|------|------|---------|-------------|--------|');
  for (const property of properties) {
    lines.push(`| ${formatCell(property.name)} | ${formatCell(property.type)} | ${formatCell(property.default)} | ${formatCell(property.description)} | ${formatCell(property.access)} |`);
  }
  if (properties.length === 0) {
    lines.push('| - | - | - | - | - |');
  }

  lines.push('');
  lines.push('## Available Methods');
  lines.push('');
  lines.push('| Name | Parameters | Return Type | Description |');
  lines.push('|------|------------|-------------|-------------|');
  for (const method of methods) {
    const parameters = method.parameters.length > 0
      ? method.parameters.map((parameter) => (parameter.type ? `${parameter.name}: ${parameter.type}` : parameter.name)).join(', ')
      : '-';
    lines.push(`| ${formatCell(method.name)} | ${formatCell(parameters)} | ${formatCell(method.returnType)} | ${formatCell(method.description)} |`);
  }
  if (methods.length === 0) {
    lines.push('| - | - | - | - |');
  }

  lines.push('');
  lines.push('## Available CSS Parts');
  lines.push('');
  lines.push('| Name | Description |');
  lines.push('|------|-------------|');
  for (const part of cssParts) {
    lines.push(`| ${formatCell(part.name)} | ${formatCell(part.description)} |`);
  }
  if (cssParts.length === 0) {
    lines.push('| - | - |');
  }

  lines.push('');
  lines.push('## Available Events');
  lines.push('');
  lines.push('| Name | Event Type | Description |');
  lines.push('|------|------------|-------------|');
  for (const event of events) {
    lines.push(`| ${formatCell(event.name)} | ${formatCell(event.type)} | ${formatCell(event.description)} |`);
  }
  if (events.length === 0) {
    lines.push('| - | - | - |');
  }

  lines.push('');
  lines.push('## Dependencies');
  lines.push('');
  if (dependencies.length > 0) {
    for (const dependency of dependencies) {
      lines.push(`- **${dependency}**`);
    }
  } else {
    lines.push('- None');
  }

  lines.push('');
  lines.push('## Usage Information');
  lines.push('');
  lines.push(`- **Status:** ${status}`);
  lines.push(`- **Since:** ${since}`);

  // Add custom sections if provided through override
  if (enrichedOverride?.customSections) {
    for (const [, section] of Object.entries(enrichedOverride.customSections)) {
      const sectionData = section as { title: string; content: string };
      lines.push('');
      lines.push(`## ${sectionData.title}`);
      lines.push('');
      lines.push(sectionData.content);
    }
  }

  return `${lines.join('\n')}\n`;
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
    const fullLayerRefs: LayerRef[] = [];
    const interfaceLayerRefs: LayerRef[] = [];

    try {
      // Token artifact entities are grouped by package path under layers/full/tokens.
      const isGroupedTokenEntity = entity.kind === 'token' && entity.package === 'tokens';
      // Style module entities are grouped by package path under layers/full/styles.
      const isGroupedStyleEntity = entity.kind === 'style' && entity.package === 'styles';
      // Font artifact entities are grouped by package path under layers/full/fonts.
      const isGroupedFontsEntity = entity.kind === 'utility' && entity.package === 'fonts';
      // Asset artifact entities are grouped by package path under layers/full/assets.
      const isGroupedAssetEntity = entity.kind === 'asset' && entity.package === 'assets';

      // Create entity's layer directory
      let entityLayerDir: string;
      if (isGroupedTokenEntity) {
        entityLayerDir = join(layersDir, 'full', 'tokens');
      } else if (isGroupedStyleEntity) {
        entityLayerDir = join(layersDir, 'full', 'styles');
      } else if (isGroupedFontsEntity) {
        entityLayerDir = join(layersDir, 'full', 'fonts');
      } else if (isGroupedAssetEntity) {
        entityLayerDir = join(layersDir, 'full', 'assets');
      } else {
        entityLayerDir = join(layersDir, 'full', entity.kind, entity.id);
      }
      await ensureDir(entityLayerDir);

      // Copy each source file
      for (const sourcePath of entity.sources ?? []) {
        const fullSourcePath = join(repoRoot, sourcePath);
        let destPath: string;
        if (isGroupedTokenEntity) {
          destPath = join(
            entityLayerDir,
            mapTokenLayerPath(sourcePath),
          );
        } else if (isGroupedStyleEntity) {
          destPath = join(
            entityLayerDir,
            mapStyleLayerPath(sourcePath),
          );
        } else if (isGroupedFontsEntity) {
          destPath = join(
            entityLayerDir,
            mapFontsLayerPath(sourcePath),
          );
        } else if (isGroupedAssetEntity) {
          destPath = join(
            entityLayerDir,
            mapAssetsLayerPath(sourcePath),
          );
        } else {
          destPath = join(
            // Group files by package label (components|react|vue|angular|…) so that
            // identically-named files from different packages don't collide,
            // e.g. layers/full/component/component:syn-button/react/button.ts
            entityLayerDir,
            getPackageLabel(sourcePath),
            basename(sourcePath),
          );
        }

        try {
          await mkdir(dirname(destPath), { recursive: true });
          await copyFile(fullSourcePath, destPath);

          const relativeLayerPath = relative(outputDir, destPath);

          fullLayerRefs.push({
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
          fullLayerRefs.push({
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

      // Write canonical component interface snapshot JSON.
      const interfaceSnapshot = getComponentInterfaceSnapshot(entity);
      if (interfaceSnapshot) {
        const interfacePath = join(layersDir, 'interface', entity.kind, `${entity.id}.json`);
        const interfaceMarkdownPath = join(layersDir, 'interface', entity.kind, `${entity.id}.md`);
        await ensureDir(dirname(interfacePath));

        // Get enriched override if config is available
        const enrichedOverride = ctx.config ? (getOverride(ctx.config, entity.id, true) ?? undefined) : undefined;

        await writeFile(interfacePath, `${JSON.stringify(interfaceSnapshot, null, 2)}\n`, 'utf8');
        await writeFile(
          interfaceMarkdownPath,
          renderInterfaceMarkdown(interfaceSnapshot, enrichedOverride),
          'utf8',
        );
        interfaceLayerRefs.push({
          layer: 'interface',
          path: relative(outputDir, interfacePath),
        });
        interfaceLayerRefs.push({
          layer: 'interface',
          path: relative(outputDir, interfaceMarkdownPath),
        });
        ctx.logger?.debug(`Wrote interface snapshot: ${relative(outputDir, interfacePath)}`);
        ctx.logger?.debug(`Wrote interface markdown: ${relative(outputDir, interfaceMarkdownPath)}`);
      }

      if (fullLayerRefs.length > 0 || interfaceLayerRefs.length > 0) {
        layersByEntity[entity.id] = {
          ...(fullLayerRefs.length > 0 ? { full: fullLayerRefs } : {}),
          ...(interfaceLayerRefs.length > 0 ? { interface: interfaceLayerRefs } : {}),
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
