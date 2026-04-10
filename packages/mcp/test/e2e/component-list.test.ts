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

describe('component-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns rules and component names', async () => {
    const response = await session.client.callTool({
      arguments: {},
      name: 'component-list',
    });
    const typedResponse = toToolResponse(response);

    assert.equal(typedResponse.content.length, 2);

    expectRulesPreface(typedResponse);
    const componentNames = parseJsonContent<string[]>(typedResponse, 1);
    assert.ok(Array.isArray(componentNames));
    assert.ok(componentNames.includes('syn-button'));
  });
});
