// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';

/**
 * Config artifact types
 */
export type ArtifactType = 'storybook';

/**
 * Storybook artifact schema - flexible record of any values
 */
export const StorybookArtifactSchema = z.record(z.string(), z.any());
export type StorybookArtifact = z.infer<typeof StorybookArtifactSchema>;

/**
 * Component override schema
 */
export const ComponentOverrideSchema = z.object({
  customSections: z.record(
    z.string(),
    z.object({
      content: z.string(),
      title: z.string(),
    }),
  ).optional(),
  figmaComponentId: z.string().optional(),
  storySourcePath: z.string().optional(),
  storyTags: z.array(z.string()).optional(),
}).strict();

export type ComponentOverride = z.infer<typeof ComponentOverrideSchema>;

/**
 * Component rules schema — authored design guidance per component.
 */
export const ComponentRulesSchema = z
  .object({
    accessibility: z.array(z.string()).optional(),
    component: z.string(),
    knownIssues: z
      .array(
        z.object({
          browser: z.string(),
          description: z.string(),
        }),
      )
      .optional(),
    related: z
      .object({
        components: z.array(z.string()).optional(),
        templates: z.array(z.string()).optional(),
      })
      .optional(),
    usageGuidelines: z.record(z.string(), z.array(z.string())).optional(),
    useCases: z.array(z.string()).optional(),
  })
  .strict();

export type ComponentRules = z.infer<typeof ComponentRulesSchema>;

/**
 * Clustering schema
 */
export const ClusterSchema = z
  .object({
    description: z.string().optional(),
    entities: z.array(z.string()),
    name: z.string(),
  })
  .strict();

export type Cluster = z.infer<typeof ClusterSchema>;

/**
 * Container for all config
 */
export interface ConfigContext {
  artifacts: {
    storybook?: StorybookArtifact;
  };
  clustering: Map<string, Cluster>;
  overrides: Map<string, ComponentOverride>;
  rules: Map<string, ComponentRules>;
}

/**
 * Enriched override with story structure from artifact
 */
export interface EnrichedOverride extends ComponentOverride {
  stories?: Array<{
    name: string;
    title?: string;
    description?: string;
  }>;
}
