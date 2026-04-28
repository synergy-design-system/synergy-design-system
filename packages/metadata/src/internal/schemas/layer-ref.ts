import { z } from 'zod';

/**
 * A reference to a layer asset (markdown, JSON, source code, etc.)
 * that provides audience-specific content for a metadata entity.
 */
export const LayerRefSchema = z.object({
  /**
   * Layer kind: examples (use cases), interface (API docs), full (source details)
   */
  layer: z.enum(['examples', 'interface', 'full']),
  /**
   * Relative path to the asset, e.g., "metadata/layers/examples/components/button/basic.md"
   */
  path: z.string(),
});

export type LayerRef = z.infer<typeof LayerRefSchema>;
