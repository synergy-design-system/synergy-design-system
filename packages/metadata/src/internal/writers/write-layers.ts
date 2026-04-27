/**
 * Write layer assets (markup, source code snapshots, etc.)
 * Copies source files to data/layers/full/{kind}/{id}/ and builds layer references.
 */
import {
  access, copyFile, mkdir, writeFile,
} from 'node:fs/promises';
import {
  basename, dirname, join, relative,
} from 'node:path';
import { type Result, err, ok } from '../core/result.js';
import { type Context } from '../core/context.js';
import { type WriteError } from '../core/errors.js';
import { type CoreEntity } from '../schemas/index.js';
import { type LayerRef } from '../schemas/layer-ref.js';
import {
  type EnrichedOverride, getOverride,
} from '../../config/index.js';
import { formatGeneratedMarkdown } from '../core/markdown.js';
import { ensureDir, writeJsonAtomic } from './fs-utils.js';

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
  if (sourcePath.includes('/external-data/davinci-migrations/')) {
    return 'davinci';
  }

  // Migration path guides from docs live under a dedicated subfolder.
  if (sourcePath.includes('/docs/src/static/migration/')) {
    return 'migration';
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
  fieldName?: string;
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

const renderAttributeCell = (attribute: InterfaceAttribute | undefined): string => {
  if (!attribute) {
    return '-';
  }

  return `\`${attribute.name}\``;
};

const renderReflectsCell = (attribute: InterfaceAttribute | undefined): string => {
  if (!attribute) {
    return '-';
  }

  return attribute.reflects ? 'yes' : 'no';
};

const renderMarkdownSection = (title: string, content: string | undefined): string => {
  if (!content || content.trim().length === 0) {
    return '';
  }

  return `## ${title}\n\n${content.trimEnd()}`;
};

const renderInterfaceMarkdown = (
  rawSnapshot: Record<string, unknown>,
  enrichedOverride?: EnrichedOverride,
): string => {
  // @todo Re-enable component rules in interface markdown by restoring the
  // rules parameter and appending the rules-driven sections below.
  // const renderInterfaceMarkdown = (
  //   rawSnapshot: Record<string, unknown>,
  //   enrichedOverride?: EnrichedOverride,
  //   rules?: ComponentRules,
  // ): string => {
  const snapshot = rawSnapshot as InterfaceSnapshot;

  const tagName = snapshot.tagName ?? 'unknown-component';
  const summary = snapshot.summary ?? '';
  const { documentation } = snapshot;
  const sourceModulePath = snapshot.sourceModulePath?.trim();
  const status = snapshot.status?.trim();
  const since = snapshot.since?.trim();
  const slots = snapshot.slots ?? [];
  const attributes = snapshot.attributes ?? [];
  const properties = snapshot.properties ?? [];
  const methods = snapshot.methods ?? [];
  const cssParts = snapshot.cssParts ?? [];
  const events = snapshot.events ?? [];
  const dependencies = snapshot.dependencies ?? [];

  const classInformationLines: string[] = [
    `- **Tag Name:** \`${tagName}\``,
  ];

  // Build import example from module path
  const importExample = sourceModulePath
    ? `import ${tagName.charAt(0).toUpperCase() + tagName.slice(1).replace(/-./g, (x) => x[1].toUpperCase())} from '@synergy-design-system/components/${sourceModulePath.replace(/\.js$/, '')}.js';`
    : undefined;

  if (importExample) {
    classInformationLines.push(`- **Import Example:** \`${importExample}\``);
  }

  const slotsContent = slots
    .map(slot => `- \`${slot.name.length === 0 ? '(default)' : slot.name}\`: ${formatCell(slot.description)}`)
    .join('\n');

  // Filter properties to only include public ones with descriptions.
  const publicProperties = properties.filter((p) => p.access === 'public' && p.description && p.description.trim().length > 0);

  const attributeByPropertyName = new Map<string, InterfaceAttribute>();
  for (const attribute of attributes) {
    if (!attribute.fieldName) {
      continue;
    }

    if (!attributeByPropertyName.has(attribute.fieldName)) {
      attributeByPropertyName.set(attribute.fieldName, attribute);
    }
  }

  const propertiesContent = publicProperties
    .map(prop => {
      const defaultValue = formatCell(prop.default);
      const formattedDefault = defaultValue === '-' ? 'none' : `\`${defaultValue}\``;
      const mappedAttribute = attributeByPropertyName.get(prop.name);

      return `
### ${prop.name}

attribute: ${renderAttributeCell(mappedAttribute)}
reflects: ${renderReflectsCell(mappedAttribute)}
type: \`${prop.type}\`
default: ${formattedDefault}

${formatCell(prop.description)}
      `.trim();
    })
    .join('\n');

  const publicPropertyNames = new Set(publicProperties.map((p) => p.name));
  const attributeOnlyMembers = attributes.filter(
    (attribute) => !attribute.fieldName || !publicPropertyNames.has(attribute.fieldName),
  );

  const attributesProperties = attributeOnlyMembers.map(attr => {
    const defaultValue = formatCell(attr.default);
    const formattedDefault = defaultValue === '-' ? 'none' : `\`${defaultValue}\``;
    return `
### ${attr.name}

reflects: ${renderReflectsCell(attr)}
type: \`${attr.type}\`
default: ${formattedDefault}

${formatCell(attr.description)}
    `.trim();
  }).join('\n');

  const attributesContent = attributesProperties.length > 0
    ? `These attributes are reflected but not exposed as component properties.\n\n${attributesProperties}`
    : undefined;

  // Filter methods to only include those with descriptions, and format parameters
  const publicMethods = methods.filter((m) => m.description && m.description.trim().length > 0);

  const methodsContent = publicMethods
    .map(method => {
      const parameters = method.parameters.length > 0
        ? method.parameters.map((parameter) => (parameter.type ? `\`${parameter.name}: ${parameter.type}\`` : `\`${parameter.name}\``)).join(', ')
        : '-';
      return `
### ${method.name}()

parameters: ${parameters}
returns: \`${method.returnType ?? 'void'}\`

${method.description}
      `.trim();
    })
    .join('\n');

  const cssPartsContent = cssParts
    .map(part => `- \`${part.name}\`: ${part.description}`)
    .join('\n');

  // Format event types with backticks
  const eventsContent = events
    .map(event => `
### ${event.name}

type: ${event.type ? `\`${event.type}\`` : '-'}

${event.description}
    `.trim())
    .join('\n');

  // Format dependency names with backticks
  const dependenciesContent = dependencies
    .map((dependency) => `- \`${dependency}\``)
    .join('\n');

  const usageLines: string[] = [];
  if (status) {
    usageLines.push(`- **Status:** ${status}`);
  }
  if (since) {
    usageLines.push(`- **Since:** ${since}`);
  }
  const usageContent = usageLines.length > 0 ? usageLines.join('\n') : undefined;

  // Build the documentation section
  const documentationLines: string[] = [];

  if (documentation) {
    documentationLines.push(`[Component Documentation](${documentation})`);
  }

  // Add figma link if available in enriched override
  if (enrichedOverride?.figmaComponentId) {
    documentationLines.push(`[Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=${enrichedOverride.figmaComponentId})`);
  }

  const finalDocumentation = documentationLines
    .map(item => `- ${item}`)
    .join('\n');

  const sections: string[] = [
    renderMarkdownSection('Summary', summary.length > 0 ? summary : '-'),
    renderMarkdownSection('Documentation', finalDocumentation),
    renderMarkdownSection('Class Information', classInformationLines.join('\n')),
    renderMarkdownSection('Usage Information', usageContent),
    renderMarkdownSection('Available Slots', slotsContent),
    renderMarkdownSection('Available Properties', propertiesContent),
    renderMarkdownSection('Attribute-only Members', attributesContent),
    renderMarkdownSection('Available Methods', methodsContent),
    renderMarkdownSection('Available CSS Parts', cssPartsContent),
    renderMarkdownSection('Available Events', eventsContent),
    renderMarkdownSection('Dependencies', dependenciesContent),
  ];

  // Add custom sections if provided through override
  if (enrichedOverride?.customSections) {
    for (const [, section] of Object.entries(enrichedOverride.customSections)) {
      const sectionData = section;
      sections.push(renderMarkdownSection(sectionData.title, sectionData.content));
    }
  }

  // if (rules) {
  //   if (rules.useCases && rules.useCases.length > 0) {
  //     sections.push(renderMarkdownSection(
  //       'Common Use Cases',
  //       rules.useCases.map(uc => `- ${uc}`).join('\n'),
  //     ));
  //   }
  //
  //   if (rules.usageGuidelines && Object.keys(rules.usageGuidelines).length > 0) {
  //     const guidelinesContent = Object.entries(rules.usageGuidelines)
  //       .map(([key, items]) => {
  //         const heading = key.charAt(0).toUpperCase() + key.slice(1);
  //         return `### ${heading}\n\n${items.map(item => `- ${item}`).join('\n')}`;
  //       })
  //       .join('\n\n');
  //     sections.push(renderMarkdownSection('Usage Guidelines', guidelinesContent));
  //   }
  //
  //   if (rules.accessibility && rules.accessibility.length > 0) {
  //     sections.push(renderMarkdownSection(
  //       'Accessibility',
  //       rules.accessibility.map(item => `- ${item}`).join('\n'),
  //     ));
  //   }
  //
  //   if (rules.knownIssues && rules.knownIssues.length > 0) {
  //     sections.push(renderMarkdownSection(
  //       'Known Issues',
  //       rules.knownIssues.map(issue => `- **${issue.browser}**: ${issue.description}`).join('\n'),
  //     ));
  //   }
  //
  //   const relatedComponents = rules.related?.components ?? [];
  //   const relatedTemplates = rules.related?.templates ?? [];
  //   if (relatedComponents.length > 0 || relatedTemplates.length > 0) {
  //     const parts: string[] = [];
  //     if (relatedComponents.length > 0) {
  //       parts.push(`### Components\n\n${relatedComponents.map(c => `- \`${c}\``).join('\n')}`);
  //     }
  //     if (relatedTemplates.length > 0) {
  //       parts.push(`### Templates\n\n${relatedTemplates.map(t => `- ${t}`).join('\n')}`);
  //     }
  //     sections.push(renderMarkdownSection('Related', parts.join('\n\n')));
  //   }
  // }

  const nonEmptySections = sections.filter((section) => section.length > 0);
  return `# ${tagName}\n\n${nonEmptySections.join('\n\n')}\n`;
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

        // @todo Re-enable component rules in generated interface artifacts by
        // restoring getRules() here, merging rules into interfaceSnapshot JSON,
        // and passing rules into renderInterfaceMarkdown().
        // const rules = ctx.config ? (getRules(ctx.config, entity.id) ?? undefined) : undefined;

        // Merge figmaComponentId from override into snapshot
        if (enrichedOverride?.figmaComponentId) {
          interfaceSnapshot.figmaComponentId = enrichedOverride.figmaComponentId;
        }

        // if (rules) {
        //   interfaceSnapshot.rules = rules;
        // }

        const interfaceMarkdown = await formatGeneratedMarkdown(
          renderInterfaceMarkdown(interfaceSnapshot, enrichedOverride),
          // renderInterfaceMarkdown(interfaceSnapshot, enrichedOverride, rules),
        );

        await writeJsonAtomic(interfacePath, interfaceSnapshot);
        await writeFile(
          interfaceMarkdownPath,
          interfaceMarkdown,
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

      // Discover generated examples files (from storybook scraper) for this entity
      const examplesLayerRefs: LayerRef[] = [];
      const examplesFilePath = join(layersDir, 'examples', entity.kind, `${entity.id}.md`);
      try {
        await access(examplesFilePath);
        examplesLayerRefs.push({
          layer: 'examples',
          path: relative(outputDir, examplesFilePath),
        });
        ctx.logger?.debug(`Discovered examples file: ${relative(outputDir, examplesFilePath)}`);
      } catch {
        // File doesn't exist, which is fine - examples are optional and only generated during build:all
      }

      if (fullLayerRefs.length > 0 || interfaceLayerRefs.length > 0 || examplesLayerRefs.length > 0) {
        layersByEntity[entity.id] = {
          ...(fullLayerRefs.length > 0 ? { full: fullLayerRefs } : {}),
          ...(interfaceLayerRefs.length > 0 ? { interface: interfaceLayerRefs } : {}),
          ...(examplesLayerRefs.length > 0 ? { examples: examplesLayerRefs } : {}),
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
