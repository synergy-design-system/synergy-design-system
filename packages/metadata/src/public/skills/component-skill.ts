import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { MetadataStore } from '../types.js';
import { buildSkillRootMarkdown, readSkillBody } from './shared.js';
import type { SkillGenerationMetadata } from './types.js';

export const generateComponentSkill = async (
  store: MetadataStore,
  outputPath: string,
  metadata: SkillGenerationMetadata,
): Promise<void> => {
  const skillPath = join(outputPath, 'synergy-component');
  const componentPath = join(skillPath, 'components');
  await mkdir(componentPath, { recursive: true });

  await writeFile(
    join(skillPath, 'SKILL.md'),
    buildSkillRootMarkdown(
      'synergy-component',
      'Local Synergy Design System component reference without MCP. Use to understand component APIs, usage guidelines, examples, and best practices for your local development.',
      {
        ...metadata,
        contentLayer: 'interface,rules,examples',
        skillType: 'component-reference',
      },
      await readSkillBody('component'),
    ),
    'utf-8',
  );

  const components = await store.findEntities({ kind: 'component', package: 'components' });
  for (const entity of components) {
    const componentName = entity.id.replace('component:', '');
    const componentFacetPath = join(componentPath, componentName);
    await mkdir(componentFacetPath, { recursive: true });

    if (entity.layers?.interface) {
      for (const layerRef of entity.layers.interface) {
        if (!layerRef.path.endsWith('.md')) continue;
        try {
          const content = await store.readLayerFile(layerRef);
          await writeFile(join(componentFacetPath, 'interface.md'), content, 'utf-8');
          break;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(`Failed to copy interface for ${componentName}:`, error);
        }
      }
    }

    for (const layer of ['rules', 'examples'] as const) {
      if (!entity.layers?.[layer]) continue;
      for (const layerRef of entity.layers[layer]) {
        try {
          const content = await store.readLayerFile(layerRef);
          await writeFile(join(componentFacetPath, `${layer}.md`), content, 'utf-8');
          break;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(`Failed to copy ${layer} for ${componentName}:`, error);
        }
      }
    }
  }
};
