import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { SkillGenerationMetadata } from './types.js';

export interface SkillFrontmatterMetadata extends SkillGenerationMetadata {
  skillType: string;
  contentLayer: string;
}

export type SkillTemplateContext = {
  CONTENT_LAYER: string;
  DATA_BUILT_AT: string;
  DESCRIPTION: string;
  GENERATED_AT: string;
  NAME: string;
  SCHEMA_VERSION: string;
  SKILL_TYPE: string;
  SKILL_VERSION: string;
  SOURCE: string;
  SYNERGY_VERSION: string;
};

const packageDirectory = dirname(dirname(dirname(dirname(fileURLToPath(import.meta.url)))));
const skillBodyCache = new Map<string, string>();

export const readPackageVersion = (packageJsonContent: string): string => {
  const parsed: unknown = JSON.parse(packageJsonContent);

  if (
    typeof parsed !== 'object'
    || parsed === null
    || !('version' in parsed)
    || typeof parsed.version !== 'string'
  ) {
    throw new Error('Invalid package.json: missing string "version" field');
  }

  return parsed.version;
};

export const readSkillBody = async (skill: 'component' | 'templates' | 'intents'): Promise<string> => {
  const cached = skillBodyCache.get(skill);
  if (cached !== undefined) {
    return cached;
  }

  const fileName = skill === 'templates' ? 'template-skill-body.md' : `${skill}-skill-body.md`;
  const content = await readFile(join(packageDirectory, 'skills-content', fileName), 'utf-8');
  const trimmed = content.trim();
  skillBodyCache.set(skill, trimmed);
  return trimmed;
};

export const renderSkillBody = (body: string, context: SkillTemplateContext): string => {
  const rendered = body.replace(/\{\{([A-Z][A-Z0-9_]*)\}\}/g, (placeholder, key: string) => {
    if (!(key in context)) {
      throw new Error(`Unknown skill template placeholder: ${placeholder}`);
    }
    return context[key as keyof SkillTemplateContext];
  });
  const unresolved = rendered.match(/\{\{[^}]+\}\}/g);
  if (unresolved) {
    throw new Error(`Unresolved skill template placeholders: ${unresolved.join(', ')}`);
  }
  return rendered;
};

export const buildSkillRootMarkdown = (
  name: string,
  description: string,
  metadata: SkillFrontmatterMetadata,
  body: string,
): string => {
  const renderedBody = renderSkillBody(body, {
    CONTENT_LAYER: metadata.contentLayer,
    DATA_BUILT_AT: metadata.dataBuiltAt,
    DESCRIPTION: description,
    GENERATED_AT: metadata.generatedAt,
    NAME: name,
    SCHEMA_VERSION: metadata.schemaVersion,
    SKILL_TYPE: metadata.skillType,
    SKILL_VERSION: metadata.version,
    SOURCE: metadata.source,
    SYNERGY_VERSION: metadata.synergyVersion,
  });

  return `
---
name: ${name}
description: '${description}'
metadata:
  skill-version: "${metadata.version}"
  synergy-version: "${metadata.synergyVersion}"
  source: "${metadata.source}"
  generated-at: "${metadata.generatedAt}"
  data-built-at: "${metadata.dataBuiltAt}"
  schema-version: "${metadata.schemaVersion}"
  skill-type: "${metadata.skillType}"
  content-layer: "${metadata.contentLayer}"
---

${renderedBody}
`.trim();
};
