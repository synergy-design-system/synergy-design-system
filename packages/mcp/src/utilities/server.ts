import type { ToolAnnotations } from '@modelcontextprotocol/sdk/types.js';

/**
 * Creates a set of tool annotations with default values, allowing for overrides.
 * @param overrides The overrides to apply to the default tool annotations.
 * @returns ToolAnnotations object with the specified overrides applied.
 */
export const createToolAnnotations = (overrides?: Partial<ToolAnnotations>): ToolAnnotations => ({
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
  readOnlyHint: true,
  ...overrides,
});
