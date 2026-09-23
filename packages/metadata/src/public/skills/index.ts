import { readFile } from 'node:fs/promises';
import { createMetadataStore } from '../store.js';
import type { MetadataStore } from '../types.js';
import { generateComponentSkill } from './component-skill.js';
import { generateIntentSkill } from './intent-skill.js';
import { readPackageVersion } from './shared.js';
import { generateTemplateSkill } from './template-skill.js';
import type { SkillBundleOptions, SkillName } from './types.js';

export type { SkillBundleOptions, SkillName } from './types.js';

const ALL_SKILLS: SkillName[] = ['component', 'templates', 'intents'];

const getPackageVersion = async (): Promise<string> => {
  const packageJsonContent = await readFile(new URL('../../../package.json', import.meta.url), 'utf-8');
  return readPackageVersion(packageJsonContent);
};

const getSynergyVersion = async (store: MetadataStore): Promise<string> => {
  const entity = await store.getEntity('setup:components-package');
  const version = entity?.custom?.packageVersion;
  if (!version) {
    throw new Error('Metadata is missing the Synergy components package version.');
  }
  return version as string;
};

export const generateSkillBundle = async (options: SkillBundleOptions): Promise<void> => {
  const selectedSkills = options.skills ?? ALL_SKILLS;
  const store = createMetadataStore({ dataDir: options.dataDir });
  const index = await store.getIndex();
  const metadata = {
    dataBuiltAt: index.builtAt,
    generatedAt: new Date().toISOString(),
    schemaVersion: index.version,
    source: 'synergy-design-system',
    synergyVersion: await getSynergyVersion(store),
    version: await getPackageVersion(),
  };

  if (selectedSkills.includes('component')) {
    await generateComponentSkill(store, options.outputPath, metadata);
  }
  if (selectedSkills.includes('templates')) {
    await generateTemplateSkill(store, options.outputPath, metadata);
  }
  if (selectedSkills.includes('intents')) {
    await generateIntentSkill(options.outputPath, metadata, { dataDir: options.dataDir });
  }
};
