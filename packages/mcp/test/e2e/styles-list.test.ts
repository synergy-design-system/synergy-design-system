import assert from 'node:assert/strict';
import {
  after,
  before,
  describe,
  test,
} from 'node:test';
import type { ToolResponse } from '../../src/utilities/metadata.ts';
import { type ClientSession, createClientSession } from './harness.ts';

let session: ClientSession;

describe('styles-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  test('returns rules and style names over stdio', async () => {
    const response = await session.client.callTool({
      arguments: {},
      name: 'styles-list',
    });
    const typedResponse = response as ToolResponse;

    assert.ok(Array.isArray(typedResponse.content), 'Response content should be an array');
    assert.equal(typedResponse.content.length, 2, 'Response content should have length 2');

    const [rulesContent, listContent] = typedResponse.content;
    assert.equal(rulesContent.type, 'text', 'Rules content should be of type text');
    assert.match(rulesContent.text, /Rules for chatbots and llms/i, 'Rules content text should match expected pattern');

    assert.equal(listContent.type, 'text', 'List content should be of type text');
    const styleNames = JSON.parse(listContent.text) as string[];
    assert.ok(Array.isArray(styleNames), 'Style names should be an array');
    assert.ok(styleNames.includes('syn-body'), 'Style names should include "syn-body"');
  });
});
