import { z } from 'zod';
import { LayerRefSchema } from './layer-ref.js';

/**
 * Entity kind: component, design token, utility, setup guide, etc.
 */
export const EntityKindSchema = z.enum([
  'asset',
  'component',
  'style',
  'setup',
  'token',
  'utility',
]);

export type EntityKind = z.infer<typeof EntityKindSchema>;

/**
 * Component status: stable, beta, deprecated, etc.
 */
export const StatusSchema = z.enum([
  'stable',
  'beta',
  'experimental',
  'deprecated',
]);

export type Status = z.infer<typeof StatusSchema>;

/**
 * A relation reference to another entity (e.g., a component depends on another component).
 */
export const RelationRefSchema = z.object({
  /**
   * Target entity ID (e.g., "component:syn-icon")
   */
  id: z.string(),
  /**
   * Relation type
   */
  type: z.enum(['dependsOn', 'usedBy', 'partOf', 'relates']),
});

export type RelationRef = z.infer<typeof RelationRefSchema>;

/**
 * Core metadata entity: the canonical record for any asset (component, token, utility, etc.)
 * Contains identity, status, relations, and pointers to layer assets.
 */
export const CoreEntitySchema = z.object({
  /**
   * Custom, entity-type-specific metadata (figma IDs, owner team, etc.)
   * Can be extended per entity kind.
   */
  custom: z.record(z.string(), z.unknown()).optional(),

  /**
   * Unique canonical identifier (e.g., "component:syn-button", "token:color-primary")
   */
  id: z.string(),

  /**
   * Entity kind
   */
  kind: EntityKindSchema,

  /**
   * Layer asset references (examples, API docs, source code, etc.)
   * Grouped by layer type.
   */
  layers: z.record(z.string(), z.array(LayerRefSchema)).default({}),

  /**
   * Human-readable name
   */
  name: z.string(),

  /**
   * Source package (components, tokens, fonts, styles, etc.)
   */
  package: z.string(),

  /**
   * Relations to other entities (dependencies, usage, etc.)
   */
  relations: z.array(RelationRefSchema).default([]),

  /**
   * Semver or date when this entity was introduced
   */
  since: z.string(),

  /**
   * Source file paths used to generate this entity (for provenance)
   */
  sources: z.array(z.string()).default([]),

  /**
   * Release/stability status
   */
  status: StatusSchema,

  /**
   * Search tags for discoverability
   */
  tags: z.array(z.string()).default([]),
});

export type CoreEntity = z.infer<typeof CoreEntitySchema>;
