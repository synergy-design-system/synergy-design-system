import { z } from 'zod';

/**
 * A snapshot lock file records metadata about scraped/collected data:
 * when it was fetched, from where, and a hash for change detection.
 * Used to avoid re-processing if source hasn't changed.
 */
export const SnapshotLockSchema = z.object({
  /**
   * SHA256 or similar hash of the collected content (for change detection)
   */
  contentHash: z.string().optional(),

  /**
   * ISO timestamp when data was collected
   */
  fetchedAt: z.string().datetime(),

  /**
   * Human-readable notes about this snapshot
   */
  notes: z.string().optional(),

  /**
   * Version of the parser/collector that generated this snapshot
   */
  parserVersion: z.string().optional(),

  /**
   * Source identifier (e.g., "components", "docs", "tokens")
   */
  source: z.string(),

  /**
   * Source URL or path (for docs, API endpoints, etc.)
   */
  sourceUrl: z.string().optional(),
});

export type SnapshotLock = z.infer<typeof SnapshotLockSchema>;
