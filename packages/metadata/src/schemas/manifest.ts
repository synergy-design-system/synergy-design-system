import { z } from 'zod';

/**
 * Manifest describes the metadata build: version, timestamps, checksums, build info.
 * Used for versioning and integrity checking of emitted artifacts.
 */
export const ManifestSchema = z.object({
  /**
   * Build environment / branch / commit hash
   */
  buildInfo: z.object({
    branch: z.string().optional(),
    ci: z.boolean().optional(),
    commit: z.string().optional(),
  }).optional(),

  /**
   * ISO timestamp when metadata was built
   */
  builtAt: z.string().datetime(),

  /**
   * Checksums of generated JSON files (for integrity verification)
   */
  checksums: z.record(z.string(), z.string()).optional(),

  /**
   * Metadata about which collectors ran and their success/failure
   */
  sources: z.array(z.object({
    entityCount: z.number().optional(),
    error: z.string().optional(),
    source: z.string(),
    status: z.enum(['success', 'partial', 'failed']),
  })).optional(),

  /**
   * Synergy/SDS version this metadata describes
   */
  synergyVersion: z.string().optional(),

  /**
   * Semver or date version of the metadata build
   */
  version: z.string(),
});

export type Manifest = z.infer<typeof ManifestSchema>;
