export type SkillName = 'component' | 'templates' | 'intents';

export interface SkillBundleOptions {
  outputPath: string;
  dataDir?: string;
  skills?: SkillName[];
}

export interface SkillGenerationMetadata {
  version: string;
  source: string;
  generatedAt: string;
  dataBuiltAt: string;
  schemaVersion: string;
  synergyVersion: string;
}
