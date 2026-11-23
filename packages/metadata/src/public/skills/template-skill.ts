import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { MetadataStore } from '../types.js';
import { getAggregateExampleRef } from '../utils.js';
import {
  buildSkillRootMarkdown, formatSkillExamples, readSkillBody, writeSkillExampleFiles,
} from './shared.js';
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
      'Local reference for generating, adapting, and reviewing common multi-component layouts and interaction patterns with the Synergy Design System. Provides offline composition examples and structural starting points without MCP.',
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

    const layerRef = getAggregateExampleRef(entity);
    if (!layerRef) continue;
    const hasExampleIndex = await writeSkillExampleFiles(store, entity, templateExamplePath);
    try {
      const content = await store.readLayerFile(layerRef);
      await writeFile(join(templateExamplePath, 'examples.md'), formatSkillExamples(content, hasExampleIndex), 'utf-8');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Failed to copy template example for ${templateName}:`, error);
    }
  }
};
