import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { MetadataStore } from '../types.js';
import { buildSkillRootMarkdown, readSkillBody } from './shared.js';
import type { SkillGenerationMetadata } from './types.js';

export const generateTemplateSkill = async (
  store: MetadataStore,
  outputPath: string,
  metadata: SkillGenerationMetadata,
): Promise<void> => {
  const skillPath = join(outputPath, 'synergy-templates');
  const templatePath = join(skillPath, 'templates');
  await mkdir(templatePath, { recursive: true });

  await writeFile(
    join(skillPath, 'SKILL.md'),
    buildSkillRootMarkdown(
      'synergy-templates',
      'Local Synergy Design System template reference without MCP. Use to explore implementation examples for common layout and interaction patterns for local development.',
      {
        ...metadata,
        contentLayer: 'examples',
        skillType: 'template-reference',
      },
      await readSkillBody('templates'),
    ),
    'utf-8',
  );

  const templates = await store.findEntities({ kind: 'template' });
  for (const entity of templates) {
    const templateName = entity.id.replace('template:', '');
    const templateExamplePath = join(templatePath, templateName);
    await mkdir(templateExamplePath, { recursive: true });

    if (!entity.layers?.examples) continue;
    for (const layerRef of entity.layers.examples) {
      try {
        const content = await store.readLayerFile(layerRef);
        await writeFile(join(templateExamplePath, 'examples.md'), content, 'utf-8');
        break;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Failed to copy template example for ${templateName}:`, error);
      }
    }
  }
};
