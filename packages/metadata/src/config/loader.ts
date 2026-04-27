import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  type Cluster,
  ClusterSchema,
  ComponentOverrideSchema,
  type ComponentRules,
  ComponentRulesSchema,
  type ConfigContext,
  type EnrichedOverride,
  type StorybookArtifact,
  StorybookArtifactSchema,
} from './types.js';

const parseJsonUnknown = (content: string): unknown => JSON.parse(content) as unknown;

/**
 * Load component rules from package config/rules.
 */
async function loadRules(configDir: string): Promise<Map<string, ComponentRules>> {
  const rules = new Map<string, ComponentRules>();
  const rulesDir = resolve(configDir, 'rules');

  try {
    const files = await readdir(rulesDir);
    for (const file of files) {
      if (!file.endsWith('.js')) continue;
      const filePath = join(rulesDir, file);
      const fileUrl = pathToFileURL(filePath).href;
      const mod = await import(fileUrl) as { default: unknown };
      const parsed = ComponentRulesSchema.parse(mod.default);
      const entityId = file.replace('.js', '');
      rules.set(entityId, parsed);
    }
  } catch {
    // Rules directory is optional
  }

  return rules;
}

/**
 * Get rules for an entity.
 */
export function getRules(
  context: ConfigContext,
  entityId: string,
): ComponentRules | null {
  return context.rules.get(entityId) ?? null;
}

/**
 * Load configuration from metadata package config directory
 */
export async function loadConfig(configDir: string): Promise<ConfigContext> {
  const context: ConfigContext = {
    artifacts: {},
    clustering: new Map(),
    overrides: new Map(),
    rules: new Map(),
  };

  // Load rules
  context.rules = await loadRules(configDir);

  // Load artifacts
  const artifactsDir = resolve(configDir, '..', 'external-data');
  try {
    const storybookPath = join(artifactsDir, 'storybook', '_docs.json');
    const storybookContent = await readFile(storybookPath, 'utf-8');
    const storybookData = parseJsonUnknown(storybookContent);
    context.artifacts.storybook = StorybookArtifactSchema.parse(storybookData);
  } catch {
    // Storybook artifact is optional
  }

  // Load overrides
  const overridesDir = resolve(configDir, 'overrides');
  try {
    const overrideFiles = await readdir(overridesDir);
    for (const file of overrideFiles) {
      if (!file.endsWith('.json')) continue;
      const filePath = join(overridesDir, file);
      const content = await readFile(filePath, 'utf-8');
      const data = parseJsonUnknown(content);
      const parsed = ComponentOverrideSchema.parse(data);
      const entityId = file.replace('.json', '');
      context.overrides.set(entityId, parsed);
    }
  } catch {
    // Overrides directory is optional
  }

  // Load clustering
  const clusteringDir = resolve(configDir, 'clustering');
  try {
    const entries = await readdir(clusteringDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const categoryDir = join(clusteringDir, entry.name);
      const clusterFiles = await readdir(categoryDir);
      for (const file of clusterFiles) {
        if (!file.endsWith('.json')) continue;
        const filePath = join(categoryDir, file);
        const content = await readFile(filePath, 'utf-8');
        const data = parseJsonUnknown(content);
        const parsed = ClusterSchema.parse(data);
        const clusterId = `${entry.name}/${file.replace('.json', '')}`;
        context.clustering.set(clusterId, parsed);
      }
    }
  } catch {
    // Clustering directory is optional
  }

  return context;
}

/**
 * Get story structure from storybook artifact by path
 * Example: "components.accordion" -> stories from _docs.json
 */
function getStorybookStructure(
  artifact: StorybookArtifact,
  path: string,
): Record<string, unknown> | null {
  const parts = path.split('.');
  let current: unknown = artifact;
  for (const part of parts) {
    if (typeof current !== 'object' || current === null || !(part in current)) {
      return null;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === 'object' && current !== null ? (current as Record<string, unknown>) : null;
}

/**
 * Enrich override with story data from artifacts
 */
export function enrichOverride(
  override: Omit<EnrichedOverride, 'stories'>,
  context: ConfigContext,
): EnrichedOverride {
  const enriched: EnrichedOverride = { ...override };

  if (override.storySourcePath && context.artifacts.storybook) {
    const storyStructure = getStorybookStructure(context.artifacts.storybook, override.storySourcePath);
    if (storyStructure) {
      enriched.stories = [];
      for (const [key, value] of Object.entries(storyStructure)) {
        // Filter out metadata fields (title, description at component level)
        if (key === 'title' || key === 'description') continue;

        const storyData = value as Record<string, unknown>;
        enriched.stories.push({
          description: (storyData.description as string) || undefined,
          name: key,
          title: (storyData.title as string) || undefined,
        });
      }
    }
  }

  return enriched;
}

/**
 * Get override for an entity, optionally enriched
 */
export function getOverride(
  context: ConfigContext,
  entityId: string,
  enrich = true,
): EnrichedOverride | null {
  const override = context.overrides.get(entityId);
  if (!override) return null;
  return enrich ? enrichOverride(override, context) : override;
}

/**
 * Get all clustering groups that reference an entity
 */
export function getClustersForEntity(context: ConfigContext, entityId: string): Cluster[] {
  const clusters: Cluster[] = [];
  for (const cluster of context.clustering.values()) {
    if (cluster.entities.includes(entityId)) {
      clusters.push(cluster);
    }
  }
  return clusters;
}
