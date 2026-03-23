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
export const ComponentOverrideSchema = z
  .object({
    figmaComponentId: z.string().optional(),
    storyTags: z.array(z.string()).optional(),
    storySourcePath: z.string().optional(),
    customSections: z
      .record(
        z.string(),
        z.object({
          title: z.string(),
          content: z.string(),
        })
      )
      .optional(),
  })
  .strict();

export type ComponentOverride = z.infer<typeof ComponentOverrideSchema>;

/**
 * Clustering schema
 */
export const ClusterSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    entities: z.array(z.string()),
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
  overrides: Map<string, ComponentOverride>;
  clustering: Map<string, Cluster>;
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
