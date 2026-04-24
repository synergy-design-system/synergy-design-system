/**
 * Shared types for MCP tool responses.
 * These are intentionally separated from middleware/metadata utilities to avoid
 * circular dependencies as different domains (logging, token-counting, response
 * formatting) need to work with the same response shape.
 */

export type ToolResponseContentEntry = {
  text: string;
  type: 'text';
};

export type ToolResponse = {
  content: ToolResponseContentEntry[];
};
