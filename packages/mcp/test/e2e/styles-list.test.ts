import assert from 'node:assert/strict';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import {
  type ClientSession,
  createClientSession,
  expectRulesPreface,
  parseJsonContent,
  toToolResponse,
} from '../utilities/index.ts';

let session: ClientSession;

describe('styles-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns rules and style names over stdio', async () => {
    const response = await session.client.callTool({
      arguments: {},
      name: 'styles-list',
    });
    const typedResponse = toToolResponse(response);

    assert.equal(typedResponse.content.length, 2);

    expectRulesPreface(typedResponse);
    const styleNames = parseJsonContent<string[]>(typedResponse, 1);
    assert.ok(Array.isArray(styleNames));
    assert.ok(styleNames.includes('syn-body'));
  });
});
