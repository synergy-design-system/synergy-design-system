import assert from 'node:assert/strict';
import type { ToolResponse } from '../../src/utilities/metadata.ts';

/**
 * Converts an unknown response to a typed ToolResponse.
 * @param response The response to convert.
 * @returns The typed ToolResponse.
 */
export const toToolResponse = (response: unknown): ToolResponse => {
  const typedResponse = response as ToolResponse;
  assert.ok(Array.isArray(typedResponse.content));
  return typedResponse;
};

/**
 * Asserts that the response contains the expected rules preface.
 * @param response The ToolResponse to check.
 */
export const expectRulesPreface = (response: ToolResponse): void => {
  assert.ok(response.content.length > 0);
  const [rulesContent] = response.content;
  assert.equal(rulesContent.type, 'text');
  assert.match(rulesContent.text, /Rules for chatbots and llms/i);
};

/**
 * Parses the JSON content from a ToolResponse at the specified index.
 * @param response The ToolResponse to parse.
 * @param index The index of the content to parse.
 * @returns The parsed JSON object.
 */
export const parseJsonContent = <T>(response: ToolResponse, index: number): T => {
  assert.ok(response.content.length > index);
  const entry = response.content[index];
  assert.equal(entry.type, 'text');
  return JSON.parse(entry.text) as T;
};
